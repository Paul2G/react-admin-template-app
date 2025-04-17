import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useRouteError,
} from "react-router";
import clsx from "clsx";
import { getFixedT } from "i18next";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

import { ViewLayout } from "~/core/components";
import { HeaderMain } from "~/layouts/components/header-main";
import { BreadcrumbNav } from "~/layouts/components/header-main/breadcrumb-nav";
import { SidebarDrawer } from "~/layouts/components/sidebar-drawer";
import { SidebarMenu } from "~/layouts/components/sidebar-menu";

import { HttpStatusCode } from "~/core/constants/fetch.ts";
import { useOpener } from "~/core/hooks";
import { getUserLocalePreference } from "~/layouts/utils/locales.ts";
import { checkLogin } from "~/modules/user/api";
import {
  getUserToken,
  removeUserToken,
} from "~/modules/user/utils/token.client.ts";

export async function loader() {
  const { language } = getUserLocalePreference();
  const token = getUserToken();
  const t = getFixedT(language);

  if (!token) {
    return redirect("/auth/login");
  }

  try {
    const user = await checkLogin({ token });
    return { user, meta: { title: t("router:home") } };
  } catch (e) {
    console.error(e);
    removeUserToken();
    return redirect("/auth/login");
  }
}

/** Default layout for projectConfig modules */
export default function MainLayout({ children }: { children?: ReactNode }) {
  const { isOpen, toggleOpen } = useOpener();
  const navigation = useNavigation();

  return (
    <div className="relative flex h-[100dvh] w-full overflow-y-hidden">
      <ProgressBar
        className={clsx(
          "absolute z-100 h-1 w-full transition-opacity duration-200",
          navigation.state !== "idle" ? "opacity-100" : "opacity-0",
        )}
        mode="indeterminate"
      ></ProgressBar>
      <SidebarDrawer
        visible={isOpen}
        toggleVisible={toggleOpen}
        className="border-y-0 border-l-0"
      />
      <SidebarMenu
        className={clsx(
          "p-card border-surface-200 z-50 hidden w-16 rounded-none border-r shadow-none sm:block",
        )}
        key="sidebar-menu"
      />
      <div className="flex w-full flex-col sm:w-[calc(100%-4rem)]">
        <HeaderMain
          className="p-card border-surface-200 z-10 rounded-none border-b shadow-none"
          key={"header-main"}
        >
          <Button
            icon="ph ph-sidebar text-lg"
            className="aspect-square"
            onClick={toggleOpen}
          />
          <BreadcrumbNav className="max-sm:hidden" />
        </HeaderMain>
        <main className="bg-surface-ground flex h-full flex-col overflow-x-hidden overflow-y-scroll p-4 pr-2 sm:p-6 sm:pr-4">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { t } = useTranslation();
  const navigate = useNavigate();

  console.error(error);

  const finalErrorStatus = isRouteErrorResponse(error)
    ? error.status
    : HttpStatusCode.INTERNAL_SERVER_ERROR;

  const finalErrorStatusText = isRouteErrorResponse(error)
    ? t(`statusCodes:${error.status}.large`)
    : t("dialogs.unexpectedError");

  return (
    <MainLayout>
      <ViewLayout
        title={
          isRouteErrorResponse(error)
            ? t(`statusCodes:${error.status}.short`)
            : t("dialogs.unexpectedError")
        }
      >
        <ViewLayout.Section>
          <div className="flex h-[40vh] w-full flex-col items-center justify-center gap-6">
            <div className="flex w-[64rem] max-w-full flex-col items-center px-4 text-center">
              <span className="text-7xl font-medium sm:text-9xl">
                {finalErrorStatus}
              </span>
              <span className="sm:text-lg">{finalErrorStatusText}</span>
            </div>
            <div className="flex gap-1">
              <Button
                severity="secondary"
                icon="ph ph-arrow-left"
                onClick={() => navigate(-1)}
              />
              <Link to="/">
                <Button
                  severity="secondary"
                  label={t("actions.backToHome")}
                  icon="ph ph-house"
                />
              </Link>
            </div>
          </div>
        </ViewLayout.Section>
      </ViewLayout>
    </MainLayout>
  );
}
