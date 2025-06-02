const projectConfig = {
  name: "React Admin Template App",
  brand: "Social Events Manager",
  baseApi: {
    url: import.meta.env?.VITE_BASE_API_URL,
  },
} as const;

export default projectConfig;
