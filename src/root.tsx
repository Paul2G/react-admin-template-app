import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ShouldRevalidateFunctionArgs,
  useNavigate,
  useRouteError,
  useRouteLoaderData,
} from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";

import { LayoutProvider } from "~/layouts/context/layout-provider.tsx";
import { ToastProvider } from "~/layouts/context/toast-provider.tsx";

import { HttpStatusCode } from "~/core/constants/fetch.ts";
import { useSetDocumentTitle } from "~/layouts/hooks/use-set-document-title.tsx";
import {
  getUserLocalePreference,
  setLocaleInDocument,
} from "~/layouts/utils/locales.ts";
import {
  getUserThemePreference,
  setThemeInDocument,
} from "~/layouts/utils/themes.ts";
import {
  getUserUiScalePreference,
  setUiScaleInDocument,
} from "~/layouts/utils/ui-scale.ts";

/** Avoid unnecessary root revalidations if not needed */
export const shouldRevalidate = ({
  formMethod,
  currentUrl,
  nextUrl,
}: ShouldRevalidateFunctionArgs) => {
  if (formMethod && formMethod !== "GET") {
    return true;
  }
  return currentUrl.toString() === nextUrl.toString();
};

export async function loader() {
  const selectedTheme = getUserThemePreference();
  setThemeInDocument(selectedTheme);
  const selectedLocale = getUserLocalePreference();
  setLocaleInDocument(selectedLocale);
  const selectedUiScale = getUserUiScalePreference();
  setUiScaleInDocument(selectedUiScale);

  return {
    selectedLocale,
    selectedTheme,
    selectedUiScale,
  };
}

export default function Root() {
  const rootData = useRouteLoaderData("root");
  const { i18n } = useTranslation();

  useSetDocumentTitle();

  useEffect(() => {
    i18n.changeLanguage(rootData?.selectedLocale.key).then();
  }, [rootData?.selectedLocale.key]);

  return (
    <PrimeReactProvider>
      <LayoutProvider
        locale={rootData.selectedLocale}
        theme={rootData.selectedTheme}
        scale={rootData.selectedUiScale}
      >
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </LayoutProvider>
      <ConfirmDialog />
    </PrimeReactProvider>
  );
}

export function HydrateFallback() {
  return (
    <div className="pointer-events-none fixed z-10 flex h-[100dvh] w-screen items-center justify-center">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        animationDuration=".5s"
      />
    </div>
  );
}

export function ErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();
  const navigate = useNavigate();

  const finalErrorStatus = isRouteErrorResponse(error)
    ? error.status
    : HttpStatusCode.INTERNAL_SERVER_ERROR;

  const finalErrorStatusText = isRouteErrorResponse(error)
    ? t(`statusCodes:${error.status}.large`)
    : t("dialogs.unexpectedError");

  console.error(error);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6">
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
  );
}
