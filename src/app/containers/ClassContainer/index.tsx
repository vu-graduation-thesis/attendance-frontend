import { Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useSystemStore } from "core/store/useSystemStore";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const { Title } = Typography;

export const ClassContainer = () => {


  return (
    <div
      className={cx("container")}
    >

    </div>
  );
};
