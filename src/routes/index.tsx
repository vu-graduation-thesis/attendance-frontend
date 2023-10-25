import { memo } from "react";

import NoLayout from "core/app/layouts/NoLayout/index";
import { ClassManagementPage } from "core/app/pages/ClassManagementPage";
import { ClassSchedulePage } from "core/app/pages/ClassSchedulePage/index.tsx";
import { ClassroomManagementPage } from "core/app/pages/ClassroomManagementPage/index.tsx";
import { CollectFacePage } from "core/app/pages/CollectFacePage/index";
import { ConfigPage } from "core/app/pages/ConfigPage";
import { HomePage } from "core/app/pages/HomePage";
import { LoginPage } from "core/app/pages/LoginPage/index";
import { AttendancePage } from "core/app/pages/Mobile/AttendancePage/index.tsx";
import { LessonPage } from "core/app/pages/Mobile/Lesson/index.tsx";
import { NotFoundPage } from "core/app/pages/NotFoundPage";
import { StatisticPage } from "core/app/pages/StatisticPage";
import { StudentManagementPage } from "core/app/pages/StudentManagementPage/index";
import { SubjectManagementPage } from "core/app/pages/SubjectManagementPage/index.tsx";
import { TeacherManagementPage } from "core/app/pages/TeacherManagementPage/index.tsx";
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
    path: routeConfig.teacher,
    component: memo(TeacherManagementPage),
  },
  {
    path: routeConfig.notFound,
    component: memo(NotFoundPage),
  },
  {
    path: routeConfig.subject,
    component: memo(SubjectManagementPage),
  },
  {
    path: routeConfig.classroom,
    component: memo(ClassroomManagementPage),
  },
  {
    path: routeConfig.viewClass,
    component: memo(ClassSchedulePage),
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
  {
    path: routeConfig.mobile.home,
    component: memo(AttendancePage),
    layout: NoLayout,
  },
  {
    path: routeConfig.mobile.lesson,
    component: memo(LessonPage),
    layout: NoLayout,
  },
];

export { privateRoutes, publicRoutes };
