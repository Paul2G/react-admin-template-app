const projectConfig = {
  name: "React Admin Template App",
  brand: "Sol Beauty & Care",
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
  },
  authApi: {
    url: import.meta.env?.VITE_AUTH_API_URL,
    loginPath: "api/auth/login",
    logoutPath: "api/auth/logout",
    whoamiPath: "api/me",
  },
} as const;

export default projectConfig;
