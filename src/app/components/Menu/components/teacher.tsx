import TeacherIcon from "core/assets/images/training.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types.ts";

export const teacherMenu = {
  transkey: "menu.teacher",
  key: routeConfig.teacher,
  icon: <img src={TeacherIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
