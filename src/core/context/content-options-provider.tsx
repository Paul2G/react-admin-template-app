import { type JSX, type ReactNode } from "react";

import {
  ContentColumnsProvider,
  type ContentColumnsContextValue,
} from "~/core/context/content-columns-provider";
import {
  ContentFiltersProvider,
  type ContentFiltersContextValue,
} from "~/core/context/content-filters-provider";
import {
  ContentLayoutProvider,
  type ContentLayoutContextValue,
} from "~/core/context/content-layout-provider";

import { useIsHydrated } from "~/core/hooks";
import type {
  ContentFilterConfig,
  ContentTableColumnConfig,
} from "~/core/types/content";

/** Context provider to manage content options configuration using filters, columns, and layout providers */
export function ContentOptionsProvider({
  viewName,
  filtersConfig,
  columnsConfig,
  defaultListableColumns,
  children,
}: ContentOptionsProviderProps) {
  const isHydrated = useIsHydrated();

  // If the app is not hydrated, return null to error accessing to window object
  if (!isHydrated) return null;

  return (
    <ContentFiltersProvider filtersConfig={filtersConfig}>
      {(filtersContext) => (
        <ContentColumnsProvider
          viewName={viewName}
          columnsConfig={columnsConfig}
          defaultListableColumns={defaultListableColumns}
        >
          {(columnsContext) => (
            <ContentLayoutProvider viewName={viewName}>
              {(layoutContext) => {
                return (
                  <>
                    {children instanceof Function
                      ? children({
                          ...filtersContext,
                          ...columnsContext,
                          ...layoutContext,
                        })
                      : children}
                  </>
                );
              }}
            </ContentLayoutProvider>
          )}
        </ContentColumnsProvider>
      )}
    </ContentFiltersProvider>
  );
}

export type ContentOptionsProviderValue = ContentFiltersContextValue &
  ContentColumnsContextValue &
  ContentLayoutContextValue;

type ContentOptionsProviderProps = {
  /** The name of the route for LocalStorage management. */
  viewName: string;
  /** Configuration for content filters */
  filtersConfig: Record<string, ContentFilterConfig>;
  /** Configuration for table columns */
  columnsConfig: Array<ContentTableColumnConfig>;
  /** Default columns to be listed */
  defaultListableColumns: Array<string>;
  /** React children nodes */
  children: ((context: ContentOptionsProviderValue) => JSX.Element) | ReactNode;
};
