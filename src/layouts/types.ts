export type ProjectTheme = {
  /** Unique key for the theme */
  key: string;
  /** Color scheme of the theme */
  colorScheme: "light" | "dark";
  /** Icon class for the theme */
  icon: string;
  /** Href where theme.css files is located */
  href: string;
};

export type ProjectLocale = {
  /** Unique key for the locale */
  key: string;
  /** Language code for the locale */
  language: string;
  /** Label for the language */
  languageLabel: string;
};

type ProjectUIScaleKey = "small" | "normal" | "big" | "huge";

export type ProjectUIScale = {
  /** Unique key for the UI scale */
  key: ProjectUIScaleKey;
  /** Font size from which the elements will be based through the unit `rem`. */
  fontSize: number;
};

export type UIMatchData = { meta: { title: string } };

export type UIMatchHandle = {
  title?: string;
  //navTitle_i18n?: string;
  icon?: string;
  index?: boolean;
};
