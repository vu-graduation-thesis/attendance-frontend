import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

import StatisticIcon from "core/assets/images/description.png"

export const statisticMenu = {
  transkey: "menu.statistic",
  key: routeConfig.statistic,
  icon: <img src={StatisticIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
