import { RouteObject } from "react-router";

import User, { loader } from "~/modules/user/routes/user.tsx";

const routes = {
  id: "user",
  path: "user",
  element: <User />,
  loader,
  handle: {
    icon: "ph ph-user",
    hideInMenu: true,
  },
} satisfies RouteObject;

export default routes;
