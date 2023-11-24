import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Capacitor } from "@capacitor/core";

import { routeConfig } from "core/routes/routeConfig.ts";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);
export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      navigate(routeConfig.mobile.home, {
        replace: true,
      });
    }
  }, []);

  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>Hệ thống điểm danh sinh viên</h3>
    </div>
  );
};
