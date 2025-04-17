import {
  projectDarkTheme,
  projectLightTheme,
  projectThemes,
} from "~/layouts/data/themes";
import type { ProjectTheme } from "~/layouts/types.ts";

const THEME_LOCAL_STORAGE_KEY = "userTheme";
const THEME_LINK_ELEMENT_ID = "theme-link";

export function getUserThemePreference() {
  const localStorageThemeKey = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
  const userTheme = projectThemes.find(
    ({ key }) => key === localStorageThemeKey,
  );

  if (userTheme) return userTheme;

  return isDarkThemeUserPreference() ? projectDarkTheme : projectLightTheme;
}

export function setUserThemePreference({ key }: ProjectTheme) {
  localStorage.setItem(THEME_LOCAL_STORAGE_KEY, key);
}

export function setThemeInDocument({ href, colorScheme }: ProjectTheme) {
  const linkElement = document.getElementById(
    THEME_LINK_ELEMENT_ID,
  ) as HTMLLinkElement;

  document.documentElement.setAttribute("color-scheme", colorScheme);

  linkElement.href = href;
}

function isDarkThemeUserPreference() {
  return (
    window?.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}
