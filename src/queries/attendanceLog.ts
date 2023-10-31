import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants/common.js";
import { getAttendanceLog } from "core/services/attendanceLog.js";

export const useGetAttendanceLog = (lessonId: string) =>
  useQuery(["get-attendance-log", lessonId], () => getAttendanceLog(lessonId), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled: !!lessonId,
  });
