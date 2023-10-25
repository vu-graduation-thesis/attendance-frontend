import ClassIcon from "core/assets/images/class.png";
import TeacherIcon from "core/assets/images/teacher.png";
import TimeIcon from "core/assets/images/timetable.png";
import PERMISSIONS from "core/constants/user";
import { routeConfig } from "core/routes/routeConfig";

import { MenuItemProps } from "../types";

const classManagementMenu: MenuItemProps = {
  transkey: "menu.classManagement",
  key: routeConfig.class,
  permission: PERMISSIONS.ALL,
  icon: <img src={ClassIcon} alt="" className="mr-10" />,
};

const viewClassMenu: MenuItemProps = {
  transkey: "menu.viewClass",
  key: routeConfig.viewClass,
  permission: PERMISSIONS.ALL,
  icon: <img src={TimeIcon} alt="" className="mr-10" />,
};

export const classMenu: MenuItemProps = {
  transkey: "menu.class",
  icon: <img src={TeacherIcon} alt="" className="mr-10" />,
  permission: PERMISSIONS.ALL,
  children: [classManagementMenu, viewClassMenu],
};
