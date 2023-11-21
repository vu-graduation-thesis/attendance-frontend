import {
  Alert,
  Button,
  Modal,
  Popover,
  QRCode,
  Select,
  Statistic,
  TimePicker,
  Typography,
  notification,
} from "antd";
import classNames from "classnames/bind";
import * as dayjs from "dayjs";
import "moment/locale/vi";
import moment from "moment/min/moment-with-locales";
import { useEffect, useMemo, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import LogoImage from "core/assets/images/logo.png";
import OverlayBg from "core/assets/images/overlay_bg.svg";
import configs from "core/configs/index.js";
import PERMISSIONS from "core/constants/user.ts";
import { useUpdateLesson } from "core/mutations/lesson.js";
import { useGetClasses } from "core/queries/class.js";
import { useGetLessons } from "core/queries/lesson.js";
import { useGetTeachers } from "core/queries/teacher.ts";
import { useGetUserInfo } from "core/queries/user.ts";

import styles from "./styles.module.scss";

moment.locale("vi");

const { Countdown } = Statistic;

const cx = classNames.bind(styles);
const localizer = momentLocalizer(moment);

const { Title } = Typography;

export const ClassSchedulePage = () => {
  const { data: userInfo } = useGetUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [invalidTimeSelected, setInvalidTimeSelected] = useState(false);
  const { mutateAsync: updateAttendanceSession } = useUpdateLesson();
  const [notiApi, contextHolder] = notification.useNotification();
  const { data: selectedLessonData, refetch: refetchSelectedLessonData } =
    useGetLessons(
      {
        filter: {
          _id: selectedEvent?.lessonId,
        },
        shortPolling: 5000,
      },
      !!selectedEvent?.lessonId,
    );

  const [openModalCreateSession, setOpenModalCreateSession] = useState(false);

  const [sessionEndTime, setSessionEndTime] = useState<dayjs.Dayjs>(
    dayjs.unix(new Date().getTime() / 1000),
  );

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

  const teachersFormatted = useMemo(() => {
    if (userInfo?.role === PERMISSIONS.TEACHER) {
      return [
        {
          value: userInfo?.teacher?._id,
          label: userInfo?.teacher?.name,
        },
      ];
    }

    return (
      teachersData?.map((data: any) => ({
        value: data.teacher._id,
        label: data.teacher.name,
      })) || []
    );
  }, [teachersData, userInfo]);

  useEffect(() => {
    setTeacher(teachersFormatted?.[0]?.value);
  }, [teachersFormatted]);

  console.log(
    "selectedLesson",
    selectedLessonData?.[0]?.endAttendanceSessionTime,
    selectedEvent,
  );

  useEffect(() => {
    setSessionEndTime(
      dayjs.unix(
        moment(selectedLessonData?.[0]?.endAttendanceSessionTime).unix(),
      ),
    );
  }, [selectedLessonData]);

  useEffect(() => {
    if (selectedEvent?.lessonId) {
      refetchSelectedLessonData();
    }
  }, [selectedEvent?.lessonId]);

  return (
    <div className={cx("container")}>
      {contextHolder}
      <div className="flex justify-between mb-20">
        <Title level={4}>Lịch dạy</Title>
        <div className="flex ">
          {userInfo &&
            (userInfo?.role === PERMISSIONS.ADMIN ? (
              <>
                <Title level={4} className="mr-10">
                  Chọn giảng viên:
                </Title>
                <Select
                  style={{
                    minWidth: 200,
                  }}
                  onChange={value => setTeacher(value)}
                  options={teachersFormatted}
                  defaultActiveFirstOption
                  value={teacher}
                />
              </>
            ) : (
              <Title level={4} className="mr-10">
                Giảng viên: {userInfo?.teacher?.name}
              </Title>
            ))}
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
          components={{
            event: ({ event }: any) => (
              <Popover
                content={
                  <div>
                    <Button
                      type="text"
                      className="w-full"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                    >
                      Giảng viên điểm danh
                    </Button>{" "}
                    <br />
                    <Button
                      type="text"
                      className="w-full"
                      onClick={() => {
                        setSelectedEvent(event);
                        setOpenModalCreateSession(true);
                      }}
                    >
                      Tạo link cho sinh viên tự điểm danh
                    </Button>
                  </div>
                }
                title="Chọn hành động"
                trigger="click"
              >
                <div>{event.title}</div>
              </Popover>
            ),
          }}
        />
      </div>
      <Modal
        title="Điểm danh lớp học"
        open={isModalOpen}
        onOk={() =>
          navigate(`${configs.basePath}/lesson/${selectedEvent?.lessonId}`)
        }
        onCancel={() => {
          setSelectedEvent(undefined);
          setIsModalOpen(false);
        }}
      >
        <p>
          Thầy cô có thể điểm danh thủ công, chụp nhiều hình ảnh để điểm danh
        </p>
      </Modal>

      <Modal
        title="Tạo phiên điểm danh bằng khuôn mặt cho sinh viên"
        open={openModalCreateSession}
        footer={[
          <Button
            type="primary"
            onClick={() => {
              setSelectedEvent(undefined);
              setOpenModalCreateSession(false);
            }}
          >
            Ok
          </Button>,
        ]}
        onCancel={() => {
          setSelectedEvent(undefined);
          setOpenModalCreateSession(false);
          setSessionEndTime(dayjs.unix(new Date().getTime() / 1000));
        }}
      >
        <div className="flex align-center mt-20">
          <h3 className="mr-20">Tự động kết thúc phiên điểm danh lúc: </h3>
          <TimePicker
            value={sessionEndTime}
            onOk={e => {
              console.log(e?.toISOString());
              if (e?.isAfter(moment())) {
                setSessionEndTime(e);
                setInvalidTimeSelected(false);
                updateAttendanceSession({
                  id: selectedEvent?.lessonId,
                  endAttendanceSessionTime: e?.toISOString(),
                } as any)
                  .then(() => {
                    notiApi.success({
                      message: "Thành công",
                      description:
                        "Đã cập nhật thời gian kết thúc phiên điểm danh",
                    });
                  })
                  .catch(() => {});
                refetchSelectedLessonData();
              } else {
                setInvalidTimeSelected(true);
              }
            }}
          />
        </div>
        {invalidTimeSelected && (
          <Alert
            message="Không được chọn thời gian trong quá khứ"
            type="error"
            className="mt-20 mb-20"
            showIcon
          />
        )}
        {selectedEvent && sessionEndTime?.isAfter(moment()) && (
          <div className="mt-20 mb-20">
            <Alert
              message="Sinh viên quét mã QR để vào link điểm danh"
              type="success"
              showIcon
              className="mb-20"
            />
            <div className="flex justify-center flex-col align-center">
              <Countdown
                value={sessionEndTime.unix() * 1000}
                format="HH:mm:ss"
              />
              <QRCode
                errorLevel="H"
                value={`${configs.domain}/attendance-session/${selectedEvent?.lessonId}`}
                icon={LogoImage}
              />
              {!!selectedLessonData?.[0] && (
                <h3 className="mt-20">
                  Đã có{" "}
                  <b className="text-red">
                    {selectedLessonData?.[0]?.attendances?.length || 0} /{" "}
                    {selectedLessonData?.[0]?.class?.students?.length || 0}
                  </b>{" "}
                  điểm danh
                </h3>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
