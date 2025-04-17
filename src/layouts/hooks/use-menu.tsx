import { useTranslation } from "react-i18next";
import { RouteObject } from "react-router";
import type { MenuItem } from "primereact/menuitem";

import router from "~/config/router.tsx";

/** Main menu as a hook to manage translations and other reactive states of menu */
export function useMenu(): Array<ExtendedMenuItem> {
  const { t } = useTranslation();

  const toolsGroup = router.routes[0].children?.[2] as RouteObject;

  function parseRoute(route: RouteObject): ExtendedMenuItem | null {
    if (route.handle?.hideInMenu) return null;

    return {
      id: route.id,
      url: route?.path ?? "#",
      label: route?.handle?.title ?? t(`router:${route.id}`),
      icon: route?.handle?.icon,
      permissions: route?.handle?.permissions ?? [],
      items: route.children
        ?.map((r) => parseRoute(r))
        .filter((r) => r !== null),
    };
  }

  return parseRoute(toolsGroup)?.items ?? [];
}

export type ExtendedMenuItem = MenuItem & {
  permissions?: Array<string>;
  items?: Array<ExtendedMenuItem>;
};
