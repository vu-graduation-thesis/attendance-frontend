import StudentIcon from "core/assets/images/students.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

export const studentMenu = {
  transkey: "menu.student",
  key: routeConfig.student,
  icon: <img src={StudentIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ADMIN,
} as MenuItemProps;
