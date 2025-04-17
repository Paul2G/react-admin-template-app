import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UIMatch, useMatches } from "react-router";

import projectConfig from "~/config/project-config.ts";
import type { UIMatchData, UIMatchHandle } from "~/layouts/types.ts";

export function useSetDocumentTitle() {
  const { t, i18n } = useTranslation();
  const routes = useMatches();

  useEffect(() => {
    const currentRoute = routes[routes.length - 1] as UIMatch<
      UIMatchData,
      UIMatchHandle
    >;
    let title;

    if (currentRoute.data?.meta?.title) {
      title = `${currentRoute.data.meta.title} | ${projectConfig.name}`;
    } else if (currentRoute.handle?.title) {
      title = `${currentRoute.handle?.title} | ${projectConfig.name}`;
    } else if (currentRoute?.id) {
      title = `${t("router:" + currentRoute.id)} | ${projectConfig.name}`;
    } else {
      title = projectConfig.name;
    }

    document.title = title;
  }, [routes, i18n.language]);
}
