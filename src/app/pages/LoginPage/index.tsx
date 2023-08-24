import { Button, Input } from "antd";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "core/assets/images/google.png";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);
export const LoginPage = () => {
  const navigateTo = useNavigate();

  return (
    <div className={cx("container")}>
      <h3 className={cx("title")}>Hệ thống điểm danh sinh viên</h3>
      <h4>Đăng nhập vào hệ thống</h4>

      <div className={cx("loginContainer")}>
        <h5>Sử dụng tài khoản CTMS</h5>
        <Input className={cx("input", "mb-10")} />
        <Input className={cx("input", "mb-10")} />
        <Button
          className={cx("input", "mb-10")}
          type="primary"
          onClick={() => {
            navigateTo("/collect-face");
          }}
        >
          Đăng nhập
        </Button>
        <h5>
          Hoặc đăng nhập với <b>mail sinh viên</b>
          <Button
            className={cx("btnLoginWithGG", "input", "mb-10")}
            icon={<img src={GoogleIcon} alt="" />}
          >
            Đăng nhập với Google
          </Button>
        </h5>
      </div>
    </div>
  );
};
