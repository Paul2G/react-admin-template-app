import { useContext } from "react";

import { LocaleContext } from "~/layouts/context/layout-provider";

export function useLayoutLocale() {
  const { selectedLocale, setSelectedLocale } = useContext(LocaleContext);

  if (!selectedLocale.key) {
    throw Error("No Locale context found");
  }

  return { selectedLocale, setSelectedLocale };
}
