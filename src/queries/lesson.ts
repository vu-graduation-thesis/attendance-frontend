import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getLessons } from "core/services/lesson";
import { createLesson, updateLesson } from "core/services/lesson.ts";

export const useGetLessons = (filter: any) =>
  useQuery(["get-lessons", filter], () => getLessons(filter), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useUpdateLesson = () => useMutation(data => updateLesson(data));

export const useCreateLesson = () => useMutation(data => createLesson(data));
