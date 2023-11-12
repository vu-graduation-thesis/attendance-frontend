import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import {
  statisticStudentVerified,
  statisticsClassAttendanceStatus,
} from "core/services/statistic.js";

export const useStatisticsClassAttendanceStatus = ({
  classId = "",
  startDate = "",
  endDate = "",
}) =>
  useQuery(
    ["statisticsClassAttendanceStatus", classId, startDate, endDate],
    () => statisticsClassAttendanceStatus({ classId, startDate, endDate }),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled: !!classId,
    },
  );

export const useStatisticStudentsVerified = () =>
  useQuery(["statisticStudentVerified"], () => statisticStudentVerified(), {
    staleTime: STALE_TIME.FIVE_MINS,
  });
