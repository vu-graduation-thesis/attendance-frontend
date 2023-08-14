import { Switch, Tooltip, Typography } from "antd";
import classNames from "classnames/bind";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { LogoutOutlined } from "@ant-design/icons";

import { LANGUAGES } from "core/constants";
import { useGetUserInfo } from "core/queries/user";

import styles from "./Header.module.scss";

const { Text } = Typography;

const cx = classNames.bind(styles);

export const Header = () => {
  const { i18n, t } = useTranslation();

  const { data: userInfo } = useGetUserInfo();

  const changeLanguage = useCallback(
    (value: boolean) => {
      const lng = value ? LANGUAGES.VI : LANGUAGES.EN;

      i18n.changeLanguage(lng);
    },
    [i18n],
  );

  return (
    <div className={cx("container")}>
      <Switch
        checkedChildren="vi"
        unCheckedChildren="en"
        defaultChecked={i18n.language === LANGUAGES.VI}
        onChange={changeLanguage}
      />

      <Text className={cx("email")} strong>
        {userInfo?.email}
      </Text>
      <Tooltip title={t("app.logout")}>
        <LogoutOutlined className={cx("logoutIcon")} onClick={() => { }} />
      </Tooltip>
    </div>
  );
};
