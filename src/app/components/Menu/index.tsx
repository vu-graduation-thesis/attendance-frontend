import { Menu } from "antd";
import classNames from "classnames/bind";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import PERMISSIONS from "core/constants/user.ts";
import { useGetUserInfo } from "core/queries/user";
import { routeConfig } from "core/routes/routeConfig.ts";
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
  const navigate = useNavigate();
  const userPermissions = useMemo(() => {
    console.log(userInfo?.role);
    const permissions = [userInfo?.role];

    if (userInfo?.role === PERMISSIONS.ADMIN) {
      permissions.push(PERMISSIONS.TEACHER);
    }
    return permissions;
  }, [userInfo]);

  const { t } = useTranslation();
  const location = useLocation();

  const menu = useMemo(
    () => getAllMenuItems(menuList, t, userPermissions),
    [t, userPermissions],
  );

  useEffect(() => {
    if (userInfo && userInfo?.role === PERMISSIONS.STUDENT) {
      navigate(routeConfig.collectFace, { replace: true });
      return;
    }
  }, [navigate, userInfo]);

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
