import { Button, Input } from "antd";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
const cx = classNames.bind(styles);
export const ConfigPage = () => {
  return <div className={cx("container")}>
    <div className="flex justify-between">
      <div className={cx("border", "left")}>
        <h5>Cấu hình tài khoản CTMS</h5>

        <div className={cx("ctmsWrapper")}>
          <div>
            <Input placeholder="Tên đăng nhập" className={cx("input", "mt-10")} />
          </div>
          <div>
            <Input placeholder="Mật khẩu" className={cx("input", "mt-10")} />
          </div>

          <div className="flex flex-end">
            <Button type="primary" className="mt-10">Lưu</Button>
          </div>
        </div>
      </div>
      <div className={cx("border", "right", "profileWrapper")}>
        <h4>Profile</h4>
        <img width={150} height={150} src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" alt="" className="round-full mt-10" />
        <h5 className="mt-30">Nguyen Van A</h5>
      </div>


    </div>
  </div>;
};
