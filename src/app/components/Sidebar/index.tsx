import { Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import logoUrl from "core/assets/images/logo.png";
import { routeConfig } from "core/routes/routeConfig";
import { useSystemStore } from "core/store/useSystemStore";

import { MenuOptions } from "../Menu";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const { Title } = Typography;

export const Sidebar = () => {
  const collapsed = useSystemStore(state => state.collapsed, shallow);
  const setCollapsed = useSystemStore(state => state.setCollapsed, shallow);

  const toggleCollapsed = useCallback(
    () => setCollapsed(!collapsed),
    [collapsed],
  );

  return (
    <div
      className={cx("container", {
        containerCollapsed: collapsed,
      })}
    >
      <div
        className={cx("logoWrapper", {
          collapsed: collapsed,
        })}
      >
        <Link to={routeConfig.home} className={cx("logo")}>
          <img className={cx("logoImage")} src={logoUrl} alt="logo" />
        </Link>

        <Title className={cx("name")} level={2}>
          Fithou Attendance
        </Title>
      </div>

      <div className={cx("collapsedIconWrapper")} onClick={toggleCollapsed}>
        {collapsed ? (
          <RightCircleOutlined className={cx("collapsedIcon")} />
        ) : (
          <LeftCircleOutlined className={cx("collapsedIcon")} />
        )}
      </div>

      <MenuOptions collapsed={collapsed} />
    </div>
  );
};
