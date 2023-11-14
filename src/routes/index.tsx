import { memo } from "react";

import { ClassManagement } from "core/app/containers/ClassManagement/index.js";
import NoLayout from "core/app/layouts/NoLayout/index";
import { AdminManagementPage } from "core/app/pages/AdminManagementPage";
import { ClassManagementPage } from "core/app/pages/ClassManagementPage";
import { ClassSchedulePage } from "core/app/pages/ClassSchedulePage/index.js";
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

import { routeConfig } from "./routeConfig";
import { PrivateRoutes, PublicRoutes } from "./type";

const privateRoutes: PrivateRoutes[] = [
  {
    path: routeConfig.home,
    component: memo(HomePage),
  },
  {
    path: routeConfig.admin,
    component: memo(AdminManagementPage),
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
  {
    path: routeConfig.mobile.schedule,
    component: memo(ClassSchedulePage),
    layout: NoLayout,
  },
  {
    path: routeConfig.addClass,
    component: memo(ClassManagement),
  },
  {
    path: routeConfig.editClass,
    component: memo(ClassManagement),
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
    path: routeConfig.mobile.attendance,
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
