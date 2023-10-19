import { Switch, Tooltip, Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LogoutOutlined } from "@ant-design/icons";

import { LANGUAGES } from "core/constants";
import { useGetUserInfo } from "core/queries/user";

import styles from "./Header.module.scss";

const { Text } = Typography;

const cx = classNames.bind(styles);

export const Header = () => {
  const { i18n, t } = useTranslation();
  const navigateTo = useNavigate();

  const { data: userInfo } = useGetUserInfo();

  const changeLanguage = useCallback(
    (value: boolean) => {
      const lng = value ? LANGUAGES.VI : LANGUAGES.EN;

      i18n.changeLanguage(lng);
    },
    [i18n],
  );

  useEffect(() => {
    if (userInfo) localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <div className={cx("container")}>
      <Switch
        checkedChildren="vi"
        unCheckedChildren="en"
        defaultChecked={i18n.language === LANGUAGES.VI}
        onChange={changeLanguage}
      />

      <Text className={cx("email")} strong>
        {userInfo?.admin?.name || userInfo?.teacher?.name || userInfo?.username}
      </Text>
      <Tooltip title={t("app.logout")}>
        <LogoutOutlined
          className={cx("logoutIcon")}
          onClick={() => {
            localStorage.clear();
            navigateTo("/login", { replace: true });
          }}
        />
      </Tooltip>
    </div>
  );
};
