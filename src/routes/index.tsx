import { memo } from "react";

import { ClassManagementPage } from "core/app/pages/ClassManagementPage";
import { ConfigPage } from "core/app/pages/ConfigPage";
import { HomePage } from "core/app/pages/HomePage";
import { MobileHomePage } from "core/app/pages/Mobile";
import { NotFoundPage } from "core/app/pages/NotFoundPage";
import { StatisticPage } from "core/app/pages/StatisticPage";
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
    path: routeConfig.class,
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
  {
    path: routeConfig.mobile.home,
    component: memo(MobileHomePage),
  },
];

export { privateRoutes };
