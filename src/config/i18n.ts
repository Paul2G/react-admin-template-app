import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import zodEn from "zod-i18n-map/locales/en/zod.json";
import zodEs from "zod-i18n-map/locales/es/zod.json";

import { defaultProjectLocale, projectLocales } from "~/layouts/data/locales";
import * as en from "~/locales/en";
import * as es from "~/locales/es";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    supportedLngs: Object.values(projectLocales).map(
      ({ language }) => language,
    ),
    fallbackLng: defaultProjectLocale.language,
    defaultNS: "core",
    fallbackNS: "core",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { ...en, zod: zodEn },
      es: { ...es, zod: zodEs },
    },
  });

export default i18n;
