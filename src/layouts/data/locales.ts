import type { ProjectLocale } from "~/layouts/types.ts";

export const projectLocales: Array<ProjectLocale> = [
  {
    key: "es-MX",
    language: "es",
    languageLabel: "Español",
  },
  {
    key: "en-US",
    language: "en",
    languageLabel: "English",
  },
];

export const defaultProjectLocale = projectLocales[0];
