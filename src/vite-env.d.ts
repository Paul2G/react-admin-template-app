/// <reference types="vite/client" />
interface ImportMeta {
  env: {
    /** The URL of the main API to be used */
    VITE_BASE_API_URL: string;
    /** The URL of the auth API to be used */
    VITE_AUTH_API_URL: string;
    /** Activate the bypass protection if a custom login will be used  */
    VITE_BYPASS_PROTECTION: "true" | "false";
  };
}
