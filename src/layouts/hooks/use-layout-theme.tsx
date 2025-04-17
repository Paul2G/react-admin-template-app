import { useContext } from "react";

import { ThemeContext } from "~/layouts/context/layout-provider";

export function useLayoutTheme() {
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);

  if (!selectedTheme.key) {
    throw Error("No Theme context found");
  }

  return { selectedTheme, setSelectedTheme };
}
