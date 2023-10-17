import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getStudents } from "core/services/student.ts";

export const useGetStudents = () =>
  useQuery(["get-students"], () => getStudents(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
