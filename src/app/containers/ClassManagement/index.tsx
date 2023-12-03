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
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  useCreateClass,
  useGetClasses,
  useUpdateClass,
} from "core/queries/class.js";
import { useGetClassrooms } from "core/queries/classroom.js";
import { useGetSubjects } from "core/queries/subject.js";
import { useGetTeachers } from "core/queries/teacher.js";

import StudentTableTransfer from "../StudentTableTransfer/index.js";
import styles from "./styles.module.scss";

const { Title } = Typography;

const cx = classNames.bind(styles);

export const ClassManagement = () => {
  const { classId } = useParams();
  const [mode, setMode] = useState<"create" | "update">(() =>
    classId ? "update" : "create",
  );

  const { data: classesData } = useGetClasses({
    filter: {
      _id: classId,
    },
  });

  console.log("classesData", classesData);

  const { t } = useTranslation();
  const [students, setStudents] = useState<any>([]);
  const { data: teachersData } = useGetTeachers();
  const { data: classroomsData } = useGetClassrooms();
  const { data: subjectsData } = useGetSubjects();
  const { mutateAsync: createClass } = useCreateClass();
  const [numberOfLessonsPerWeek, setNumberOfLessonsPerWeek] = useState(1);
  const [notiApi, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [firstSelectSchedule, setFirstSelectSchedule] = useState<dayjs.Dayjs>();
  const childRef = useRef<any>();
  const { mutateAsync: updateClass } = useUpdateClass();

  console.log("firstSelectSchedule", classId, mode);

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

  useEffect(() => {
    if (classesData) {
      const classData = classesData[0];
      form.setFieldsValue({
        classId: classData.classId,
        name: classData.name,
        subject: classData.subject._id,
        totalNumberOfLessons: classData.totalNumberOfLessons,
        numberOfCredits: classData.numberOfCredits,
        teacher: classData.teacher._id,
        numberOfLessonsPerWeek: classData.lessonSchedules.length,
      });

      setNumberOfLessonsPerWeek(classData.lessonSchedules.length);
      setStudents(classesData?.[0]?.students?.map(x => x._id));
      setFirstSelectSchedule(dayjs(classData.lessonSchedules?.[0]?.startDay));
    }
  }, [classesData]);

  return (
    <Form
      name="basic"
      className={cx("container")}
      form={form}
      onFinish={async value => {
        const lessonSchedules = Array(numberOfLessonsPerWeek || 0)
          .fill(0)
          .map((_, index) => ({
            startDay: value?.[`schedule[${index}]`]?.format("DD/MM/YYYY"),
            classroom: value?.[`classroom[${index}]`],
          }));

        if (mode === "create") {
          await createClass({
            ...value,
            students,
            lessonSchedules,
          });
        } else {
          await updateClass({
            ...value,
            students,
            lessonSchedules,
            classId,
          });
        }

        form.resetFields();

        childRef.current?.reset();
        setStudents([]);

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
        {mode === "create" && (
          <>
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
                  defaultValue={1}
                />
              </Form.Item>
            </div>
            <div>
              {numberOfLessonsPerWeek > 0 &&
                Array(numberOfLessonsPerWeek)
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
                          <DatePicker
                            style={{ width: "100%", minWidth: "300px" }}
                            onChange={value => {
                              if (index === 0) {
                                setFirstSelectSchedule(value);
                              }
                            }}
                            disabledDate={current => {
                              if (!firstSelectSchedule || index === 0) {
                                return false;
                              }
                              return (
                                current &&
                                !current.isSame(firstSelectSchedule, "week")
                              );
                            }}
                          />
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
          </>
        )}
      </div>

      <StudentTableTransfer
        onChange={setStudents}
        ref={childRef}
        initTargetKeys={students}
      />

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
