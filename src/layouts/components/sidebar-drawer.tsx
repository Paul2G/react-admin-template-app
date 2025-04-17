import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import clsx from "clsx";
import { Button } from "primereact/button";
import type { MenuItem } from "primereact/menuitem";
import { PanelMenu } from "primereact/panelmenu";
import { Sidebar } from "primereact/sidebar";

import { useMenu, type ExtendedMenuItem } from "~/layouts/hooks/use-menu";
import { usePermissions } from "~/modules/user/hooks/use-permissions";

export function SidebarDrawer({
  visible,
  toggleVisible,
  className,
}: SidebarDrawerProps) {
  const { t } = useTranslation();
  const { p } = usePermissions();

  const items = useMenu();

  const itemRenderer = (item: ExtendedMenuItem, options: any) => {
    if (!p(item.permissions)) return null;

    if (options.hasSubMenu)
      return (
        <Button
          severity="secondary"
          text
          className="text-surface-900 flex w-full items-center gap-1 px-3 py-2 text-left"
        >
          <i className={clsx(item.icon, "text-2xl")} />
          <span className="font-medium">{item.label}</span>
          {options?.hasSubmenu && (
            <i
              className={clsx(
                "ph-bold ph-caret-down ml-auto transition-transform",
                options?.active && "rotate-180",
              )}
            />
          )}
        </Button>
      );

    return (
      <NavLink to={item.url ?? "#"}>
        {({ isActive }) => (
          <Button
            severity="secondary"
            text
            className={clsx(
              "text-surface-900 flex w-full items-center gap-1 px-3 py-2 text-left",
              isActive && "bg-surface-100",
            )}
            onClick={toggleVisible}
          >
            <i className={clsx(item.icon, "text-2xl")} />
            <span className="font-medium">{item.label}</span>
          </Button>
        )}
      </NavLink>
    );
  };

  items.forEach((item) => {
    item.template = itemRenderer;
    item.items?.forEach(
      (subItem: MenuItem) => (subItem.template = itemRenderer),
    );
  });

  return (
    <Sidebar
      visible={visible}
      onHide={toggleVisible}
      className={clsx(className, "w-[90%] max-w-[22rem]")}
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src="assets/brand/logo_foil.png"
              className="w-full max-w-[5rem]"
              alt="PROJECT_NAME"
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <PanelMenu
              model={items}
              multiple
              pt={{
                headerContent: { className: "border-none rounded-md" },
                panel: { className: "border-none p-0" },
                menuitem: { open: true },
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          <NavLink to="/tools/user">
            {({ isActive }) => (
              <Button
                label={t("user:myProfile")}
                severity="secondary"
                icon="ph ph-user text-2xl"
                text
                className={clsx(
                  "text-surface-900 w-full text-left",
                  isActive && "bg-surface-100",
                )}
                onClick={toggleVisible}
              />
            )}
          </NavLink>
        </div>
      </div>
    </Sidebar>
  );
}

type SidebarDrawerProps = {
  visible: boolean;
  toggleVisible: () => void;
  className?: string;
};
