import React, { createContext, useState, type Dispatch } from "react";
import { useRevalidator } from "react-router";

import { defaultProjectLocale } from "~/layouts/data/locales";
import { projectLightTheme } from "~/layouts/data/themes";
import { projectNormalUiScale } from "~/layouts/data/ui-scales";
import {
  ProjectLocale,
  ProjectTheme,
  ProjectUIScale,
} from "~/layouts/types.ts";
import { setUserLocalePreference } from "~/layouts/utils/locales";
import {
  setThemeInDocument,
  setUserThemePreference,
} from "~/layouts/utils/themes";
import {
  setUiScaleInDocument,
  setUserUiScalePreference,
} from "~/layouts/utils/ui-scale";

export const LocaleContext = createContext<{
  selectedLocale: ProjectLocale;
  setSelectedLocale: Dispatch<ProjectLocale>;
}>({ selectedLocale: defaultProjectLocale, setSelectedLocale: () => {} });
export const ThemeContext = createContext<{
  selectedTheme: ProjectTheme;
  setSelectedTheme: Dispatch<ProjectTheme>;
}>({ selectedTheme: projectLightTheme, setSelectedTheme: () => {} });
export const ScaleContext = createContext<{
  selectedScale: ProjectUIScale;
  setSelectedScale: Dispatch<ProjectUIScale>;
}>({ selectedScale: projectNormalUiScale, setSelectedScale: () => {} });

export function LayoutProvider({
  children,
  locale,
  theme,
  scale,
}: LayoutProviderProps) {
  const { revalidate } = useRevalidator();

  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedScale, setSelectedScale] = useState(scale);

  function handleUpdateLocale(locale: ProjectLocale) {
    setSelectedLocale(locale);
    setUserLocalePreference(locale);
    revalidate().then();
  }

  function handleUpdateTheme(theme: ProjectTheme) {
    setSelectedTheme(theme);
    setUserThemePreference(theme);
    setThemeInDocument(theme);
  }

  function handleUpdateScale(scale: ProjectUIScale) {
    setSelectedScale(scale);
    setUserUiScalePreference(scale);
    setUiScaleInDocument(scale);
  }

  return (
    <LocaleContext.Provider
      value={{ selectedLocale, setSelectedLocale: handleUpdateLocale }}
    >
      <ThemeContext.Provider
        value={{ selectedTheme, setSelectedTheme: handleUpdateTheme }}
      >
        <ScaleContext.Provider
          value={{ selectedScale, setSelectedScale: handleUpdateScale }}
        >
          {children}
        </ScaleContext.Provider>
      </ThemeContext.Provider>
    </LocaleContext.Provider>
  );
}

type LayoutProviderProps = {
  locale: ProjectLocale;
  theme: ProjectTheme;
  scale: ProjectUIScale;
  children: React.ReactNode;
};
