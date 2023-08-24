import { memo } from "react";

import NoLayout from "core/app/layouts/NoLayout/index";
import { ClassManagementPage } from "core/app/pages/ClassManagementPage";
import { CollectFacePage } from "core/app/pages/CollectFacePage/index";
import { ConfigPage } from "core/app/pages/ConfigPage";
import { HomePage } from "core/app/pages/HomePage";
import { LoginPage } from "core/app/pages/LoginPage/index";
import { NotFoundPage } from "core/app/pages/NotFoundPage";
import { StatisticPage } from "core/app/pages/StatisticPage";
import { StudentManagementPage } from "core/app/pages/StudentManagementPage/index";
import { UserPage } from "core/app/pages/UserPage";

import { routeConfig } from "./routeConfig";
import { PrivateRoutes, PublicRoutes } from "./type";

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
    path: routeConfig.student,
    component: memo(StudentManagementPage),
  },
  {
    path: routeConfig.notFound,
    component: memo(NotFoundPage),
  },
];

const publicRoutes: PublicRoutes[] = [
  {
    path: routeConfig.login,
    component: memo(LoginPage),
    layout: NoLayout,
  },
  {
    path: routeConfig.collectFace,
    component: memo(CollectFacePage),
    layout: NoLayout,
  },
];

export { privateRoutes, publicRoutes };
