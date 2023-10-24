import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getStudentDetail, getStudents } from "core/services/student.ts";

export const useGetStudents = () =>
  useQuery(["get-students"], () => getStudents(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useGetStudentDetail = (id: string) =>
  useQuery(["get-student-detail", id], () => getStudentDetail(id), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
