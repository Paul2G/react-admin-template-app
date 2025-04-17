import { useContext } from "react";

import { ContentColumnsContext } from "~/core/context/content-columns-provider";

export function useContentColumns() {
  const contentColumnsContext = useContext(ContentColumnsContext);

  if (!contentColumnsContext) {
    throw new Error("No `ContentColumnsContext` found");
  }

  return contentColumnsContext;
}
