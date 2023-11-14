import UserIcon from "core/assets/images/user.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

export const adminMenu = {
  transkey: "menu.admin",
  key: routeConfig.admin,
  icon: <img src={UserIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
