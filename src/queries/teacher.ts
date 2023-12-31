import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getTeachers } from "core/services/teacher";
import { createTeacher, updateTeacher } from "core/services/teacher.ts";

export const useGetTeachers = (enabled?: boolean) =>
  useQuery(["get-teachers"], () => getTeachers(), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled,
  });

export const useUpdateTeacher = () => useMutation(data => updateTeacher(data));

export const useCreateTeacher = () => useMutation(data => createTeacher(data));
