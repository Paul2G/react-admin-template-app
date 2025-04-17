import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useSearchParams } from "react-router";
import { useUpdateEffect } from "primereact/hooks";

import type { ContentFilterConfig } from "~/core/types/content";
import type { CommonDataRecord } from "~/core/types/fetch";
import { areDeeplyEqual } from "~/core/utils/data";
import {
  getObjectFromSearchParams,
  getSearchParamsFromObject,
} from "~/core/utils/search-params";

export const ContentFiltersContext = createContext<ContentFiltersContextValue>({
  filtersConfig: {},
  setFiltersConfig: () => {},
  areFiltersDirty: false,
  selectedFilters: {},
  setSelectedFilters: () => {},
  clearFilters: () => {},
});

/** Context provider to manage content filters configuration and current selected states.
 * WARNING: THIS PROVIDER SHOULD BE ONLY RENDER ON CLIENT SIDE
 * */
export function ContentFiltersProvider({
  filtersConfig,
  children,
}: ContentFiltersProviderProps) {
  const defaultFilters = useMemo(
    () => getDefaultSelectedFilters(filtersConfig),
    [filtersConfig],
  );
  const [, setSearchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<CommonDataRecord>(
    getObjectFromSearchParams(filtersConfig),
  );
  const [stateFiltersConfigs, setStateFiltersConfigs] =
    useState<Record<string, ContentFilterConfig>>(filtersConfig);

  const areFiltersDirty = useMemo(
    () => !areDeeplyEqual(defaultFilters, selectedFilters),
    [JSON.stringify(selectedFilters)],
  );

  // Reset all filters to their default values
  function clearFilters() {
    setSelectedFilters(defaultFilters);
  }

  useUpdateEffect(() => {
    setSearchParams(getSearchParamsFromObject(selectedFilters));
  }, [JSON.stringify(selectedFilters)]);

  return (
    <ContentFiltersContext.Provider
      value={{
        filtersConfig: stateFiltersConfigs,
        setFiltersConfig: setStateFiltersConfigs,
        areFiltersDirty,
        selectedFilters,
        setSelectedFilters,
        clearFilters,
      }}
    >
      {children instanceof Function
        ? children({
            filtersConfig: stateFiltersConfigs,
            setFiltersConfig: setStateFiltersConfigs,
            areFiltersDirty,
            selectedFilters,
            setSelectedFilters,
            clearFilters,
          })
        : children}
    </ContentFiltersContext.Provider>
  );
}

function getDefaultSelectedFilters(
  filtersConfig: Record<string, ContentFilterConfig>,
) {
  const filtersDefaults: CommonDataRecord = {};
  Object.values(filtersConfig).forEach((filter) => {
    if (filter?.default !== undefined)
      filtersDefaults[filter.key] = filter?.default;
  });

  return filtersDefaults;
}

export type ContentFiltersContextValue = {
  /** Configuration for content filters */
  filtersConfig: Record<string, ContentFilterConfig>;
  /** Function to set the filters configuration. This function updates the state of filtersConfig */
  setFiltersConfig: Dispatch<
    SetStateAction<Record<string, ContentFilterConfig>>
  >;
  /** Indicates if the current filters have been modified from their default values */
  areFiltersDirty: boolean;
  /** The selected filters for content. This is a record of key-value pairs representing the filters applied to the content */
  selectedFilters: CommonDataRecord;
  /** Function to set the selected filters. This function updates the state of selectedFilters */
  setSelectedFilters: Dispatch<SetStateAction<CommonDataRecord>>;
  /** Function to clear all filters. This function resets the selectedFilters to an empty state */
  clearFilters: () => void;
};

type ContentFiltersProviderProps = {
  /** Configuration for content filters */
  filtersConfig: Record<string, ContentFilterConfig>;
  /** React children nodes */
  children: ((context: ContentFiltersContextValue) => JSX.Element) | ReactNode;
};
