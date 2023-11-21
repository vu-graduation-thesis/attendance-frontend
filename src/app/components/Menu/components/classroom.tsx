import TeacherIcon from "core/assets/images/teacher.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

export const classroomMenu = {
  transkey: "menu.classroom",
  key: routeConfig.classroom,
  icon: <img src={TeacherIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ADMIN,
} as MenuItemProps;
