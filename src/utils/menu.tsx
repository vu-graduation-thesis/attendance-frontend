import { Link } from "react-router-dom";

import { MenuItemProps } from "core/app/components/Menu/types";

import { checkPermission } from "./user";

export function getAllMenuItems(
  menu: MenuItemProps[],
  t: any,
  userPermissions: string[],
) {
  function traverseMenuItems(items: MenuItemProps[], permissions: string[]) {
    if (!items) return;
    const result = [] as MenuItemProps[];

    for (const item of items) {
      if (!checkPermission(permissions, item.permission || "")) {
        continue;
      }
      if (item.element) {
        result.push({
          ...item,
          label: t(item.transkey),
        });
      } else {
        if (item.children) {
          item.children = traverseMenuItems(item.children, permissions);
        }
        result.push({
          ...item,
          label: item.key ? (
            <Link to={`${item.key}`}>{t(item.transkey)}</Link>
          ) : (
            t(item.transkey)
          ),
        });
      }
    }

    return result;
  }

  return traverseMenuItems(menu, userPermissions);
}
