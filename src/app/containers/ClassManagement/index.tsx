import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  notification,
} from "antd";
import classNames from "classnames/bind";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useCreateClass } from "core/queries/class.js";
import { useGetClassrooms } from "core/queries/classroom.js";
import { useGetSubjects } from "core/queries/subject.js";
import { useGetTeachers } from "core/queries/teacher.js";

import StudentTableTransfer from "../StudentTableTransfer/index.js";
import styles from "./styles.module.scss";

const { Title } = Typography;

const cx = classNames.bind(styles);

export const ClassManagement = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState<any>([]);
  const { data: teachersData } = useGetTeachers();
  const { data: classroomsData } = useGetClassrooms();
  const { data: subjectsData } = useGetSubjects();
  const { mutateAsync: createClass } = useCreateClass();
  const [numberOfLessonsPerWeek, setNumberOfLessonsPerWeek] = useState(1);
  const [notiApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const teachersFormatted = useMemo(() => {
    const result =
      teachersData?.map((data: any) => ({
        value: data.teacher._id,
        label: data.teacher.name,
      })) || [];
    return result;
  }, [teachersData]);

  const classroomFormatted = useMemo(() => {
    const result =
      classroomsData?.map((data: any) => ({
        value: data._id,
        label: `${data.name} - ${data.numberOfSeats} chỗ ngồi`,
      })) || [];
    return result;
  }, [classroomsData]);

  const subjectsFormatted = useMemo(() => {
    const result =
      subjectsData?.map((data: any) => ({
        value: data._id,
        label: data.name,
      })) || [];
    return result;
  }, [subjectsData]);

  return (
    <Form
      name="basic"
      className={cx("container")}
      form={form}
      onFinish={async value => {
        const lessonSchedules = Array(numberOfLessonsPerWeek || 0)
          .fill(0)
          .map((_, index) => ({
            startDay: value[`schedule[${index}]`].format("DD/MM/YYYY"),
            classroom: value[`classroom[${index}]`],
          }));

        await createClass({
          ...value,
          students,
          lessonSchedules,
        });

        form.resetFields();

        notiApi.success({
          message: "Thành công",
          description: `Tạo lớp học thành công`,
        });
      }}
    >
      {contextHolder}
      <Title level={3} className="mb-30">
        Class Management
      </Title>
      <div className="flex justify-between">
        <div className="mb-20">
          <Title level={5}>Mã lớp học </Title>
          <Form.Item
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            name="classId"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="mb-20">
          <Title level={5}>Tên lớp học </Title>
          <Form.Item
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "Please input class name!",
              },
            ]}
            name="name"
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Title level={5}>Môn học</Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            valuePropName="value"
            name="subject"
          >
            <Select
              style={{ width: "100%", minWidth: "300px" }}
              options={subjectsFormatted}
              defaultActiveFirstOption
            />
          </Form.Item>
        </div>
        <div>
          <Title level={5}>Số buổi học </Title>
          <Form.Item
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            name="totalNumberOfLessons"
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <div>
          <Title level={5}>Số tín chỉ </Title>
          <Form.Item
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            name="numberOfCredits"
          >
            <Input type="number" />
          </Form.Item>
        </div>
      </div>
      <div className="flex justify-between mb-10">
        <div>
          <Title level={5}>Giảng viên dạy</Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            valuePropName="value"
            name="teacher"
          >
            <Select
              style={{ width: "100%", minWidth: "300px" }}
              options={teachersFormatted}
              defaultActiveFirstOption
            />
          </Form.Item>
        </div>
      </div>

      <div className="flex justify-between mb-10">
        <div>
          <Title level={5}>Số buổi học trên tuần </Title>
          <Form.Item
            valuePropName="value"
            rules={[
              {
                required: true,
                message: "Please input class code!",
              },
            ]}
            name="numberOfLessonsPerWeek"
          >
            <Input
              type="number"
              value={numberOfLessonsPerWeek}
              onChange={e => {
                setNumberOfLessonsPerWeek(parseInt(e.target.value) || 0);
              }}
            />
          </Form.Item>
        </div>
        <div>
          {Array(numberOfLessonsPerWeek)
            .fill(0)
            .map((_, index) => (
              <div className="flex justify-between mb-10">
                <div className="mr-20">
                  <Title level={5}>Ngày bắt đầu</Title>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input class code!",
                      },
                    ]}
                    name={`schedule[${index}]`}
                  >
                    <DatePicker style={{ width: "100%", minWidth: "300px" }} />
                  </Form.Item>
                </div>

                <div>
                  <Title level={5}>Phòng học cố định</Title>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Please input class code!",
                      },
                    ]}
                    name={`classroom[${index}]`}
                  >
                    <Select
                      style={{ width: "100%", minWidth: "300px" }}
                      options={classroomFormatted}
                      defaultActiveFirstOption
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
        </div>
      </div>

      <StudentTableTransfer onChange={setStudents} />

      <div className="flex flex-end">
        <Button
          className="mt-30 mr-20"
          onClick={() => {
            form.resetFields();
          }}
        >
          Reset
        </Button>
        <Button type="primary" htmlType="submit" className="mt-30">
          Submit
        </Button>
      </div>
    </Form>
  );
};
