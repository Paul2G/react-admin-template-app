import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useUpdateEffect } from "primereact/hooks";

import type { ContentTableColumnConfig } from "~/core/types/content";
import {
  getUserColumnsPreference,
  setUserColumnsPreference,
} from "~/core/utils/content-layout";

export const ContentColumnsContext = createContext<ContentColumnsContextValue>({
  columnsConfig: [],
  selectedColumnsConfig: [],
  selectedColumnsKeys: [],
  setSelectedColumnsKeys: () => {},
});

/** Context provider to manage content columns' configuration.
 * WARNING: THIS PROVIDER SHOULD BE ONLY RENDER ON CLIENT SIDE
 * */
export function ContentColumnsProvider({
  viewName,
  columnsConfig,
  defaultListableColumns,
  children,
}: ContentColumnsProviderProps) {
  const [selectedColumnsKeys, setSelectedColumnsKeys] = useState<Array<string>>(
    getUserColumnsPreference(viewName, defaultListableColumns),
  );

  /** Filter the selected columns config based on the selected keys */
  const selectedColumnsConfig = useMemo(
    () => columnsConfig.filter(({ key }) => selectedColumnsKeys?.includes(key)),
    [columnsConfig, selectedColumnsKeys],
  );

  /** Update user preferences when the selected columns change */
  useUpdateEffect(() => {
    setUserColumnsPreference(viewName, selectedColumnsKeys);
  }, [selectedColumnsKeys]);

  return (
    <ContentColumnsContext.Provider
      value={{
        columnsConfig,
        selectedColumnsKeys,
        setSelectedColumnsKeys,
        selectedColumnsConfig,
      }}
    >
      {children instanceof Function
        ? children({
            columnsConfig,
            selectedColumnsKeys,
            setSelectedColumnsKeys,
            selectedColumnsConfig,
          })
        : children}
    </ContentColumnsContext.Provider>
  );
}

export type ContentColumnsContextValue = {
  /** The configuration for all columns. This is an array of objects that define the configuration for each column in the content table */
  columnsConfig: Array<ContentTableColumnConfig>;
  /** The configuration for the selected columns. This is an array of objects that define the configuration for each column in the content table */
  selectedColumnsConfig: Array<ContentTableColumnConfig>;
  /** The keys of the selected columns. This is an array of strings representing the keys of the columns that are currently selected */
  selectedColumnsKeys: Array<string>;
  /** Function to set the keys of the selected columns. This function updates the state of selectedColumnsKeys */
  setSelectedColumnsKeys: Dispatch<SetStateAction<Array<string>>>;
};

type ContentColumnsProviderProps = {
  /** The name of the route for LocalStorage management. */
  viewName: string;
  /** Configuration for table columns */
  columnsConfig: Array<ContentTableColumnConfig>;
  /** Default columns to be listed */
  defaultListableColumns: Array<string>;
  /** React children nodes */
  children: ((context: ContentColumnsContextValue) => JSX.Element) | ReactNode;
};
