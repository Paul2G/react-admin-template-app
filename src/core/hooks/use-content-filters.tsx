import { useContext } from "react";

import { ContentFiltersContext } from "~/core/context/content-filters-provider";

export function useContentFilters() {
  const contentFiltersContext = useContext(ContentFiltersContext);

  if (!contentFiltersContext) {
    throw new Error("No `ContentFiltersContext` found");
  }

  return contentFiltersContext;
}
