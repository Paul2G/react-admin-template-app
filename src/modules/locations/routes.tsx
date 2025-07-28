import { RouteObject } from "react-router";

import LocationsIndex, {
  loader as locationsIndexLoader,
} from "~/modules/locations/routes/locations-index.tsx";

const routes = {
  id: "locations.index",
  path: "locations",
  handle: {
    icon: "ph ph-map-pin",
  },
  children: [
    {
      id: "locations",
      path: "",
      element: <LocationsIndex />,
      loader: locationsIndexLoader,
      handle: {
        index: true,
        hideInMenu: true,
      },
    },
  ],
} satisfies RouteObject;

export default routes;
