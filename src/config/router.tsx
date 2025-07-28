import { createHashRouter, redirect, RouteObject } from "react-router";

import Root, {
  ErrorBoundary as RootErrorBoundary,
  HydrateFallback as RootHydrateFallback,
  loader as rootLoader,
  shouldRevalidate as rootShouldRevalidate,
} from "~/root.tsx";

import { HttpStatusCode } from "~/core/constants/fetch.ts";
import MainLayout, {
  ErrorBoundary as MainLayoutErrorBoundary,
  loader as mainLayoutLoader,
  shouldRevalidate as mainShouldRevalidate,
} from "~/layouts/main-layout.tsx";
import dashboardRoutes from "~/modules/dashboard/routes.tsx";
import locationsRoutes from "~/modules/locations/routes.tsx";
import authRoutes from "~/modules/user/auth-routes.tsx";
import userRoutes from "~/modules/user/user-routes.tsx";

const indexCatchRoute: RouteObject = {
  id: "index",
  path: "/",
  index: true,
  loader: () => redirect("/tools"),
};

const toolsIndexRoute: RouteObject = {
  id: "tools.index",
  path: "",
  index: true,
  handle: {
    hideInMenu: true,
  },
  loader: () => redirect("/tools/dashboard"),
};

const toolsFallbackRoute: RouteObject = {
  id: "tools.$",
  path: "*",
  handle: {
    title: "Error",
    hideInMenu: true,
  },
  loader: () => {
    throw new Response(null, { status: HttpStatusCode.NOT_FOUND });
  },
};

const router = createHashRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    loader: rootLoader,
    shouldRevalidate: rootShouldRevalidate,
    hydrateFallbackElement: <RootHydrateFallback />,
    errorElement: <RootErrorBoundary />,
    children: [
      indexCatchRoute,
      authRoutes,
      {
        id: "tools",
        path: "tools",
        handle: {
          icon: "ph ph-house",
        },
        element: <MainLayout />,
        loader: mainLayoutLoader,
        shouldRevalidate: mainShouldRevalidate,
        errorElement: <MainLayoutErrorBoundary />,
        children: [
          toolsIndexRoute,
          toolsFallbackRoute,
          userRoutes,
          dashboardRoutes,
          locationsRoutes,
        ],
      },
    ],
  },
]);

export default router;
