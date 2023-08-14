import { memo } from "react";

import { HomePage } from "core/app/pages/HomePage";
import { NotFoundPage } from "core/app/pages/NotFoundPage";
import { UserPage } from "core/app/pages/UserPage";

import { routeConfig } from "./routeConfig";
import { PrivateRoutes } from "./type";

const privateRoutes: PrivateRoutes[] = [
  {
    path: routeConfig.home,
    component: memo(HomePage),
  },
  {
    path: routeConfig.users,
    component: memo(UserPage),
  },
  {
    path: routeConfig.notFound,
    component: memo(NotFoundPage),
  },
];

export { privateRoutes };
