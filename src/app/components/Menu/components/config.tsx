import ConfigIcon from "core/assets/images/settings.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

export const configMenu = {
  transkey: "menu.config",
  key: routeConfig.config,
  icon: <img src={ConfigIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.TEACHER,
} as MenuItemProps;
