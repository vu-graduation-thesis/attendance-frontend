import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

import ConfigIcon from "core/assets/images/settings.png"

export const configMenu = {
  transkey: "menu.config",
  key: routeConfig.config,
  icon: <img src={ConfigIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
