import { Modal, Select, Typography } from "antd";
import classNames from "classnames/bind";
import "moment/locale/vi";
import moment from "moment/min/moment-with-locales";
import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

import OverlayBg from "core/assets/images/overlay_bg.svg";
import { useGetClasses } from "core/queries/class.js";
import { useGetLessons } from "core/queries/lesson.js";
import { useGetTeachers } from "core/queries/teacher.ts";

import styles from "./styles.module.scss";

moment.locale("vi");

const cx = classNames.bind(styles);
const localizer = momentLocalizer(moment);

const { Title } = Typography;

export const ClassSchedulePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();

  const [teacher, setTeacher] = useState();
  const { data: classesData } = useGetClasses(
    {
      filter: {
        teacher,
      },
    },
    !!teacher,
  );
  const { data: teachersData } = useGetTeachers();

  const { data: lessonsData } = useGetLessons(
    {
      filter: {
        class: classesData?.map((data: any) => data._id),
      },
    },
    !!classesData?.length,
  );

  const navigate = useNavigate();

  const events = lessonsData?.map((lesson: any) => ({
    title: lesson.class.name,
    start: moment(lesson.lessonDay).toDate(),
    end: moment(lesson.lessonDay).add(4, "hours").toDate(),
    lessonId: lesson._id,
  }));

  const teachersFormatted = useMemo(
    () =>
      teachersData?.map((data: any) => ({
        value: data.teacher._id,
        label: data.teacher.name,
      })) || [],
    [teachersData],
  );

  useEffect(() => {
    setTeacher(teachersFormatted?.[0]?.value);
  }, [teachersFormatted]);

  return (
    <div className={cx("container")}>
      <div className="flex justify-between mb-20">
        <Title level={4}>Lịch dạy</Title>
        <div className="flex ">
          <Title level={4} className="mr-10">
            Chọn giảng viên:
          </Title>
          <Select
            style={{ width: 120 }}
            onChange={value => setTeacher(value)}
            options={teachersFormatted}
            defaultActiveFirstOption
            value={teacher}
          />
        </div>
      </div>
      <div className={cx("scheduleWrapper")}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          formats={{
            weekdayFormat: (date: any, culture: any, localizer: any) =>
              localizer.format(date, "dddd", culture),
          }}
          messages={{
            week: "Tuần",
            work_week: "Tuần làm việc",
            day: "Ngày",
            month: "Tháng",
            previous: "Trước",
            next: "Sau",
            today: `Hôm nay`,
            agenda: "Lịch công việc",
            showMore: (total: any) => `+${total} sự kiện khác`,
          }}
          dayPropGetter={(date: string) => {
            if (moment(date).isSame(moment(), "day")) {
              return;
            }

            if (!moment(date).isSame(moment(), "month")) {
              return {
                style: {
                  backgroundColor: "#F6F7F7",
                  padding: "10px !important",
                  paddingTop: "0px !important",
                },
              };
            }

            if (
              !events?.some((event: any) =>
                moment(event.start).isSame(date, "day"),
              )
            ) {
              return {
                style: {
                  backgroundImage: `url(${OverlayBg})`,
                },
              };
            }
          }}
          onSelectEvent={(event: any) => {
            setSelectedEvent(event);
            setIsModalOpen(true);
          }}
        />
      </div>
      <Modal
        title="Điểm danh lớp học"
        open={isModalOpen}
        onOk={() => navigate(`/app/lesson/${selectedEvent?.lessonId}`)}
        onCancel={() => {
          setSelectedEvent(undefined);
          setIsModalOpen(false);
        }}
      >
        <p>
          Thầy cô có thể điểm danh thủ công, chụp nhiều hình ảnh, quay video để
          điểm danh
        </p>
      </Modal>
    </div>
  );
};
