import { Menu } from "antd";
import classNames from "classnames/bind";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { useGetUserInfo } from "core/queries/user";
import { getAllMenuItems } from "core/utils/menu";

import styles from "./Menu.module.scss";
import { menuList } from "./components";

const cx = classNames.bind(styles);

interface Props {
  collapsed: boolean;
  onClick?: (e: any) => void;
}
export const MenuOptions = (props: Props) => {
  const { collapsed, onClick } = props;

  const { data: userInfo } = useGetUserInfo();
  const userPermissions = userInfo?.permissions || ["ALL"];

  const { t } = useTranslation();
  const location = useLocation();

  const menu = useMemo(
    () => getAllMenuItems(menuList, t, userPermissions),
    [t, userPermissions],
  );
  return (
    <div className={cx("container")}>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={menu}
        selectedKeys={[location.pathname]}
        onClick={onClick}
        className={cx("menu")}
      />
    </div>
  );
};
