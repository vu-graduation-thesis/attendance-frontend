import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getSubjects } from "core/services/subject";

export const useGetSubjects = () =>
  useQuery(["get-subjects"], () => getSubjects(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
