import { RouteObject } from "react-router";

import ShapesIndex, {
  loader as shapesIndexLoader,
} from "~/modules/shapes/routes/shapes-index.tsx";

const routes = {
  id: "shapes.index",
  path: "shapes",
  handle: {
    icon: "ph ph-shapes",
  },
  children: [
    {
      id: "shapes",
      path: "",
      element: <ShapesIndex />,
      loader: shapesIndexLoader,
      handle: {
        index: true,
        hideInMenu: true,
      },
    },
  ],
} satisfies RouteObject;

export default routes;
