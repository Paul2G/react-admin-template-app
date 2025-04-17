import projectConfig from "~/config/project-config.ts";

export function parseRouteMeta({ meta }: parseRouteMetaArgs = {}) {
  if (!meta) return [];

  return [
    {
      title: meta?.title
        ? `${meta?.title} | ${projectConfig.name}`
        : projectConfig.name,
    },
  ];
}

type parseRouteMetaArgs = {
  meta?: {
    title?: string;
  };
};
