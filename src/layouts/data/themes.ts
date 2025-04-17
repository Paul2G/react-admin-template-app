import type { ProjectTheme } from "~/layouts/types.ts";

export const projectThemes: Array<ProjectTheme> = [
  {
    key: "vivaLight",
    colorScheme: "light",
    icon: "ph ph-sun",
    href: `${import.meta.env.BASE_URL}themes/viva-light/theme.css`,
  },
  {
    key: "vivaDark",
    colorScheme: "dark",
    icon: "ph ph-moon",
    href: `${import.meta.env.BASE_URL}themes/viva-dark/theme.css`,
  },
  {
    key: "laraLight",
    colorScheme: "light",
    icon: "ph ph-sun",
    href: "https://primereact.org/themes/lara-light-blue/theme.css",
  },
  {
    key: "laraDark",
    colorScheme: "dark",
    icon: "ph ph-moon",
    href: "https://primereact.org/themes/lara-dark-blue/theme.css",
  },
  {
    key: "sohoLight",
    colorScheme: "light",
    icon: "ph ph-sun",
    href: "https://primereact.org/themes/soho-light/theme.css",
  },
  {
    key: "sohoDark",
    colorScheme: "dark",
    icon: "ph ph-moon",
    href: "https://primereact.org/themes/soho-dark/theme.css",
  },
];

export const projectLightTheme = projectThemes[0];
export const projectDarkTheme = projectThemes[1];
