import { useContext } from "react";

import {
  ContentItemsContext,
  type ContentItemsContextValue,
} from "~/core/context/content-items-provider";

export function useContentItems<T>() {
  const contentItemsContext = useContext(ContentItemsContext);

  if (!contentItemsContext) {
    throw new Error(
      "useContentItems must be used within a ContentItemsProvider",
    );
  }

  return contentItemsContext as ContentItemsContextValue<T>;
}
