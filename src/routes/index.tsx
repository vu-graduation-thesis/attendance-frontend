import { memo } from "react";

import { HomePage } from "core/app/pages/HomePage";
import { NotFoundPage } from "core/app/pages/NotFoundPage";
import { UserPage } from "core/app/pages/UserPage";

import { routeConfig } from "./routeConfig";
import { PrivateRoutes } from "./type";
import { ClassManagementPage } from "core/app/pages/ClassManagementPage";
import { ConfigPage } from "core/app/pages/ConfigPage";
import { StatisticPage } from "core/app/pages/StatisticPage";

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
    path: routeConfig.class,
    component: memo(ClassManagementPage),
  },
  {
    path: routeConfig.specificClass,
    component: memo(ClassManagementPage),
  },
  {
    path: routeConfig.config,
    component: memo(ConfigPage),
  },
  {
    path: routeConfig.statistic,
    component: memo(StatisticPage),
  },
  {
    path: routeConfig.notFound,
    component: memo(NotFoundPage),
  },
];

export { privateRoutes };
