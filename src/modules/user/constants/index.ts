import { parseBoolean } from "~/core/utils/data";

export const BYPASS_PROTECTION = parseBoolean(
  import.meta.env?.VITE_BYPASS_PROTECTION,
);
export const USER_TOKEN_COOKIE_KEY = "token";
