import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getClassrooms } from "core/services/classroom";
import { createClassroom, updateClassroom } from "core/services/classroom.ts";

export const useGetClassrooms = () =>
  useQuery(["get-classrooms"], () => getClassrooms(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useUpdateClassroom = () =>
  useMutation(data => updateClassroom(data));

export const useCreateClassroom = () =>
  useMutation(data => createClassroom(data));
