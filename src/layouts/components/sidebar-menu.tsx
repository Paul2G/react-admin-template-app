import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import clsx from "clsx";
import { Button } from "primereact/button";

import { useMenu } from "~/layouts/hooks/use-menu";
import { usePermissions } from "~/modules/user/hooks/use-permissions";

export function SidebarMenu({ className }: SidebarMenuProps) {
  const { t } = useTranslation();
  const { p } = usePermissions();

  const routerItems = useMenu();

  return (
    <aside className={clsx("px-2 py-6", className)}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src="assets/brand/logo_foil.png"
              className="h-12 w-12"
              alt="logo"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            {routerItems?.map(
              (item) =>
                item?.url &&
                p(item.permissions) && (
                  <div className="group relative" key={item.url}>
                    <NavLink to={item.url}>
                      {({ isActive }) => (
                        <Button
                          tooltip={
                            !item?.items?.length ? item.label : undefined
                          }
                          severity="secondary"
                          icon={clsx(item.icon, "text-2xl")}
                          text
                          className={clsx(
                            "text-surface-900 aspect-square w-full",
                            isActive && "bg-surface-200",
                          )}
                        />
                      )}
                    </NavLink>
                    {item?.items && Boolean(item.items?.length) && (
                      <div
                        className={clsx(
                          "rounded-pv border-surface-border bg-surface-section absolute top-0 left-[100%] border border-solid p-1",
                          "pointer-events-none opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100",
                        )}
                      >
                        <div className="text-secondary-text px-4 py-1 font-bold">
                          {item.label}
                        </div>
                        {item.items.map(
                          (subItem) =>
                            subItem?.url && (
                              <NavLink
                                to={subItem.url}
                                key={subItem.url}
                                className={clsx(
                                  p(subItem?.permissions) && "p-disabled",
                                )}
                              >
                                {({ isActive: isSubLinkActive }) => (
                                  <Button
                                    severity="secondary"
                                    icon={clsx(
                                      subItem.icon,
                                      isSubLinkActive
                                        ? "ph-bold text-lg"
                                        : "text-lg",
                                    )}
                                    label={subItem.label}
                                    text
                                    className="text-surface-900 w-full text-left"
                                    pt={{
                                      label: {
                                        class: `text-nowrap ${
                                          isSubLinkActive
                                            ? "font-semibold"
                                            : "font-normal"
                                        }`,
                                      },
                                    }}
                                  />
                                )}
                              </NavLink>
                            ),
                        )}
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <NavLink to="/tools/user">
            {({ isActive }) => (
              <Button
                tooltip={t("user:myProfile")}
                severity="secondary"
                icon={clsx("ph ph-user", "text-2xl")}
                text
                className={clsx(
                  "text-surface-900 aspect-square w-full",
                  isActive && "bg-surface-200",
                )}
              />
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

type SidebarMenuProps = {
  className?: string;
};
