import {
  createContext,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";

import type { BaseApiFunctionConfig } from "~/core/api/base";
import { useContentFilters, usePromiseData } from "~/core/hooks";
import type { PromiseState } from "~/core/hooks/use-promise-data";
import type { PaginatedResponse } from "~/core/types/fetch";

export const ContentItemsContext = createContext<ContentItemsContextValue>({
  selectedItems: [],
  setSelectedItems: () => {},
  isLoading: false,
  error: undefined,
  doReload: async () => {},
});

export function ContentItemsProvider<T>({
  itemsListGetter,
  children,
}: ContentItemsProviderProps<T>) {
  const { selectedFilters } = useContentFilters();
  const { data, isLoading, error, doReload } = usePromiseData(itemsListGetter, {
    params: selectedFilters,
  });
  const [selectedItems, setSelectedItems] = useState<Array<T>>([]);

  return (
    <ContentItemsContext.Provider
      value={{
        selectedItems,
        setSelectedItems: setSelectedItems as Dispatch<
          SetStateAction<Array<unknown>>
        >,
        data,
        isLoading,
        error,
        doReload,
      }}
    >
      {children instanceof Function
        ? children({
            selectedItems,
            setSelectedItems,
            data,
            isLoading,
            error,
            doReload,
          })
        : children}
    </ContentItemsContext.Provider>
  );
}

export type ContentItemsContextValue<T = unknown> = {
  selectedItems: Array<T>;
  setSelectedItems: Dispatch<SetStateAction<Array<T>>>;
  doReload: () => Promise<void>;
} & PromiseState<PaginatedResponse<T>>;

type ContentItemsProviderProps<T> = {
  itemsListGetter: (
    props?: Partial<BaseApiFunctionConfig>,
  ) => Promise<PaginatedResponse<T>>;
  children: ((context: ContentItemsContextValue<T>) => JSX.Element) | ReactNode;
};
