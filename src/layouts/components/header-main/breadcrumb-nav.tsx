import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  NavLink,
  useMatches,
  useRouteError,
  type UIMatch,
} from "react-router";
import clsx from "clsx";
import { BreadCrumb } from "primereact/breadcrumb";

import { UIMatchData, UIMatchHandle } from "~/layouts/types.ts";

export function BreadcrumbNav({ className }: BreadcrumbNavProps) {
  const { t } = useTranslation();
  const error = useRouteError();

  const matches = useMatches() as UIMatch<UIMatchData, UIMatchHandle>[];
  const routes = useMemo(() => {
    const lastIndex = matches[matches.length - 1].handle?.index
      ? matches.length - 1
      : matches.length;
    return matches.slice(1, lastIndex);
  }, [matches]);
  const currentRoute = matches[matches.length - 1];

  const matchTemplate = (item: UIMatch<UIMatchData, UIMatchHandle>) => {
    if (item?.pathname && currentRoute?.id !== item?.id) {
      return (
        <NavLink to={item.pathname} className="group flex items-center gap-2">
          <i className={clsx(item.handle?.icon, "ph-bold")} />
          <span className="group-hover:underline">
            {item.data?.meta?.title ?? t(`router:${item.id}`)}
          </span>
        </NavLink>
      );
    }

    if (isRouteErrorResponse(error)) {
      return (
        <span className="group flex items-center gap-2">
          <i className="ph ph-x" />
          <span>{t(`statusCodes:${error.status}.short`)}</span>
        </span>
      );
    }

    return (
      <span className="group flex items-center gap-2">
        <i className={clsx(item.handle?.icon, "ph-bold")} />
        <span>{item.data?.meta?.title ?? t(`router:${item.id}`)}</span>
      </span>
    );
  };

  // @ts-expect-error Obviously a route match doesn't have a template attrib, but we need it easily
  matches.forEach((match) => (match.template = matchTemplate));

  return (
    <BreadCrumb
      model={routes}
      pt={{ root: { className: "flex items-center p-0 overflow-hidden" } }}
      className={clsx(className, "border-0 bg-transparent")}
    />
  );
}

type BreadcrumbNavProps = {
  className?: string;
};
