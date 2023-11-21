import { Button, Form, Input, notification } from "antd";
import classNames from "classnames/bind";

import { useChangePassword } from "core/mutations/auth.ts";
import { useGetUserInfo } from "core/queries/user.ts";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);
export const ConfigPage = () => {
  const { data: userInfo } = useGetUserInfo();
  const { mutateAsync: changePassword } = useChangePassword();
  const [form] = Form.useForm();
  const [notiApi, contextHolder] = notification.useNotification();

  const handleFinish = async (values: any) => {
    const { oldPassword, newPassword, reNewPassword } = values;

    if (newPassword !== reNewPassword) {
      form.setFields([
        {
          name: "reNewPassword",
          errors: ["Mật khẩu nhập lại không khớp!"],
        },
      ]);
      return;
    }

    try {
      await changePassword({
        oldPassword,
        newPassword,
      } as any);
      notiApi.success({
        message: "Thành công",
        description: "Đổi mật khẩu thành công!",
      });
    } catch (error) {
      console.log(error);
      notiApi.error({
        message: "Thất bại",
        description: "Đổi mật khẩu thất bại!",
      });
      form.setFields([
        {
          name: "oldPassword",
          errors: ["Mật khẩu cũ không đúng!"],
        },
      ]);
    }
  };

  return (
    <div className={cx("container")}>
      {contextHolder}
      <div className="flex justify-between">
        <div className={cx("border", "left")}>
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            onFinish={handleFinish}
            form={form}
          >
            <h3>Đổi mật khẩu</h3>

            <div className={cx("ctmsWrapper")}>
              <Form.Item
                name="oldPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này!" },
                ]}
              >
                <Input
                  placeholder="Mật khẩu cũ"
                  className={cx("input", "mt-10")}
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này!" },
                ]}
              >
                <Input
                  placeholder="Mật khẩu mới"
                  className={cx("input", "mt-10")}
                />
              </Form.Item>

              <Form.Item
                name="reNewPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập trường này!" },
                ]}
              >
                <Input
                  placeholder="Nhập lại mật khẩu mới"
                  className={cx("input", "mt-10")}
                />
              </Form.Item>

              <div className="flex flex-end">
                <Button type="primary" className="mt-10" htmlType="submit">
                  Lưu
                </Button>
              </div>
            </div>
          </Form>
        </div>
        <div className={cx("border", "right", "profileWrapper")}>
          <h4>Profile</h4>
          <img
            width={150}
            height={150}
            src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
            alt=""
            className="round-full mt-10"
          />
          <h5 className="mt-30">
            {userInfo?.teacher?.name || userInfo?.admin?.name || ""}
          </h5>
        </div>
      </div>
    </div>
  );
};
