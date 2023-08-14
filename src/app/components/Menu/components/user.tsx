import { UserOutlined } from "@ant-design/icons";

import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

export const userMenu = {
  transkey: "menu.user",
  key: routeConfig.users,
  icon: <UserOutlined />,
  permission: PERMISSIONS.ALL,
} as MenuItemProps;
