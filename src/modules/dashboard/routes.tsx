import { type RouteObject } from "react-router";

import DashboardIndex, {
  loader as dashboardIndexLoader,
} from "~/modules/dashboard/routes/dashboard-index";

const routes = {
  id: "dashboard",
  path: "dashboard",
  index: true,
  element: <DashboardIndex />,
  loader: dashboardIndexLoader,
  handle: {
    icon: "ph ph-chart-donut",
  },
} satisfies RouteObject;

export default routes;
