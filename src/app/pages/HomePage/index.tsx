import classNames from "classnames/bind";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);
export const HomePage = () => {
  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>Hệ thống điểm danh sinh viên</h3>
    </div>
  );
};
