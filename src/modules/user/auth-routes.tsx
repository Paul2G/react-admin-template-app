import { RouteObject } from "react-router";

import AuthLayout, { loader as layoutLoader } from "~/layouts/auth-layout.tsx";
import AuthLogin, {
  loader as loginLoader,
} from "~/modules/user/routes/auth-login.tsx";

const routes = {
  id: "auth",
  path: "auth",
  element: <AuthLayout />,
  loader: layoutLoader,
  children: [
    {
      id: "auth.login",
      path: "login",
      element: <AuthLogin />,
      loader: loginLoader,
    },
  ],
} satisfies RouteObject;

export default routes;
