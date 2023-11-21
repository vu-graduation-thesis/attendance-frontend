import SubjectIcon from "core/assets/images/books.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types.ts";

export const subjectMenu = {
  transkey: "menu.subject",
  key: routeConfig.subject,
  icon: <img src={SubjectIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ADMIN,
} as MenuItemProps;
