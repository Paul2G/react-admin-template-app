import { defaultProjectLocale, projectLocales } from "~/layouts/data/locales";
import type { ProjectLocale } from "~/layouts/types.ts";

const LANG_LOCAL_STORAGE_KEY = "userLocale";

export function getUserLocalePreference() {
  const localStorageLocaleKey = localStorage.getItem(LANG_LOCAL_STORAGE_KEY);
  const userLocale = projectLocales.find(
    ({ key }) => key === localStorageLocaleKey,
  );

  if (userLocale) {
    return userLocale;
  }

  const browserLocaleKey = navigator?.language;
  const browserLocale = projectLocales.find(({ key }) =>
    browserLocaleKey.startsWith(key),
  );

  return browserLocale ?? defaultProjectLocale;
}

export function setUserLocalePreference({ key }: ProjectLocale) {
  localStorage.setItem(LANG_LOCAL_STORAGE_KEY, key);
}

export function setLocaleInDocument({ language }: ProjectLocale) {
  document.documentElement.setAttribute("lang", language);
}
