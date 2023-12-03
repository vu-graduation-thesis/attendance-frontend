export const routeConfig = {
  home: "/home",
  admin: "/admin-management",
  class: "/class-management",
  classManagement: "/class-management/management",
  viewClass: "/class-management/schedule",
  config: "/config-management",
  statistic: "/",
  student: "/student-management",
  subject: "/subject-management",
  teacher: "/teacher-management",
  classroom: "/classroom-management",
  login: "/login",
  collectFace: "/collect-face",
  attendanceSession: "/attendance-session/:lessionId", // for students
  lessonDetail: "/lesson/:id", // for teachers
  mobile: {
    home: "/app/home",
    lesson: "/app/lesson/:id",
    schedule: "/app/schedule",
    attendance: "/app/attendance/:id",
  },
  addClass: "/class-management/add",
  editClass: "/class-management/edit/:classId",
  notFound: "*",
};
