import { Button, Input, Typography } from "antd";
import classNames from "classnames/bind";
import * as firebase from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleIcon from "core/assets/images/google.png";
import LogoIcon from "core/assets/images/logo.png";
import configs from "core/configs/index.ts";
import { ACCOUNT_NOT_FOUND, ADMIN, TEACHER } from "core/constants/auth.js";
import { useLogin } from "core/mutations/auth.js";
import { jwtDecode } from "core/utils/jwt.js";

import styles from "./styles.module.scss";

const firebaseApp = firebase.initializeApp(configs.firebase);
const auth = getAuth(firebaseApp);

const { Title, Text } = Typography;
const cx = classNames.bind(styles);
export const LoginPage = () => {
  const navigateTo = useNavigate();
  const { mutateAsync: handleLogin, isLoading } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLoginClick = async (idToken?: any) => {
    console.log("handleLoginClick", username, password, idToken);
    try {
      const res = await handleLogin({
        username: username?.toLocaleLowerCase(),
        password,
        idToken,
      });
      localStorage.setItem("token", res.token);
      const { payload } = jwtDecode(res.token) || {};
      if (payload?.role === ADMIN || payload?.role === TEACHER) {
        console.log("navigateTo", configs.basePath);
        navigateTo(`${configs.basePath}/schedule`, { replace: true });
      } else {
        const url = new URL(window.location.href);
        const redirectTo = url.searchParams.get("redirect");

        if (!!redirectTo) {
          console.log("redirectTo", redirectTo);
          window.location.href = redirectTo;
        } else {
          navigateTo("/collect_face", { replace: true });
        }
      }
    } catch (error) {
      const errorCode = (error as any)?.response?.data?.error?.code;
      if (errorCode === ACCOUNT_NOT_FOUND) {
        setMessage("Tài khoản không tồn tại trong hệ thống");
      } else {
        setMessage("Tài khoản hoặc mật khẩu không đúng");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <img className={cx("logo")} src={LogoIcon} alt="" />
      <h3 className={cx("title")}>
        Hệ thống điểm danh <br /> sinh viên
      </h3>
      {message && <Text className={cx("red", "font-16")}>{message}</Text>}
      <div className={cx("loginContainer")}>
        <div className={cx("left")}>
          <Title level={5}>Tên đăng nhập</Title>
          <Input
            className={cx("input", "mb-10")}
            placeholder="Nhập tên đăng nhập..."
            value={username}
            onChange={e => setUsername(e.target.value)}
            allowClear
          />
        </div>
        <div className={cx("left", "mt-10")}>
          <Title level={5}>Mật khẩu</Title>
          <Input.Password
            className={cx("input", "mb-10")}
            placeholder="Nhập mật khẩu..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <Button
          className={cx("input", "mb-10", "mt-20")}
          type="primary"
          onClick={() => handleLoginClick()}
          size="large"
          loading={isLoading}
        >
          Đăng nhập
        </Button>
        <div className="mt-20">
          <Text>
            Hoặc đăng nhập với <b>mail nhà trường cung cấp</b>
          </Text>
          <Button
            className={cx("btnLoginWithGG", "input", "mb-10", "mt-10")}
            icon={<img src={GoogleIcon} alt="" />}
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider())
                .then((result: any) => {
                  handleLoginClick(result?._tokenResponse?.oauthIdToken);
                })
                .catch(error => {
                  console.log("error", error);
                });
            }}
          >
            Đăng nhập với Google
          </Button>
        </div>
      </div>
    </div>
  );
};
