import { useContext } from "react";

import { ContentLayoutContext } from "~/core/context/content-layout-provider";

export function useContentLayout() {
  const contentLayoutContext = useContext(ContentLayoutContext);

  if (!contentLayoutContext) {
    throw new Error("No `ContentLayoutContext` found");
  }

  return contentLayoutContext;
}
