

import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";
import TeacherIcon from "core/assets/images/teacher.png"

export const classMenu = {
  transkey: "menu.class",
  key: routeConfig.class,
  icon: <img src={TeacherIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
