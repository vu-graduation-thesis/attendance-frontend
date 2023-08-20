
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

import UserIcon from "core/assets/images/user.png"

export const userMenu = {
  transkey: "menu.user",
  key: routeConfig.users,
  icon: <img src={UserIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
