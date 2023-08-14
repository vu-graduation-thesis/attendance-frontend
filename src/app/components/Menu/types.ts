import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>["items"][number];

export const HAS_CHILDREN = "HAS_CHILDREN";

export type MenuItemProps = {
  label?: React.ReactNode;
  key: React.Key;
  transkey?: string;
  icon?: React.ReactNode;
  children?: MenuItemProps[];
  type?: "group";
  permission?: string;
  userPermissions?: string[];
  element?: string;
};
