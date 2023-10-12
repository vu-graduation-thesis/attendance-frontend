import { Input, Tag } from "antd";
import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

import BellIcon from "core/assets/images/bell.png";

import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);
export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className={cx("container")}>
      <div className={cx("app_header")}>
        <div className={cx("app_header-left")}>
          <div className={cx("app_header-welcome")}>{t("label.welcome")}</div>
          <h3 className={cx("app_header-welcome-text")}>Nguyễn Hữu Vũ</h3>
        </div>
        <div className={cx("app_header-right")}>
          <img src={BellIcon} alt="" className={cx("bell_icon")} />
        </div>
      </div>

      {/* search */}
      <div className={cx("search")}>
        <div className={cx("search_wrapper")}>
          <div className={cx("search_title")}>{t("label.fastSearch")}</div>
          <div className={cx("search_description")}>
            {t("label.fastSearchDescription")}
          </div>
          <Input
            className={cx("seach_input")}
            prefix={<SearchOutlined className={cx("pl-5")} />}
            placeholder="Warning with prefix"
          />
        </div>
      </div>

      {/* body */}
      <div className="body">
        <div className={cx("tag-wrapper")}>
          <Tag className={cx("tag")}>All</Tag>
          <Tag className={cx("tag")}>Phổ biến</Tag>
          <Tag className={cx("tag")}>Vừa dùng</Tag>
        </div>

        <div className={cx("menu")}>
          <div className={cx("menu_wrapper")}>
            <div className={cx("card")}></div>
            <div className={cx("card")}></div>
            <div className={cx("card")}></div>
          </div>
        </div>
      </div>

      {/* Bottom navigator */}
      <div className={cx("bottom")}>
        <div className={cx("bottom_item")}>
          <HomeOutlined className={cx("bottom_icon")} />
        </div>
        <div className={cx("bottom_item")}>
          <HomeOutlined className={cx("bottom_icon")} />
        </div>
        <div className={cx("bottom_item", "center_bottom_item")}>
          <div className={cx("bottom_overlay")}></div>
          <div className={cx("center_bottom_wrapper")}>
            <HomeOutlined className={cx("bottom_icon")} />
          </div>
        </div>
        <div className={cx("bottom_item")}>
          <HomeOutlined className={cx("bottom_icon")} />
        </div>
        <div className={cx("bottom_item")}>
          <HomeOutlined className={cx("bottom_icon")} />
        </div>
      </div>
    </div>
  );
};
