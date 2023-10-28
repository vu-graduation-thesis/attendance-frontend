import { useMutation } from "react-query";

import {
  createLesson,
  manualAttendance,
  updateLesson,
} from "core/services/lesson.js";

export const useManualAttendace = () =>
  useMutation(
    ({ lessonId, studentId }: { lessonId: string; studentId: string }) =>
      manualAttendance({
        lessonId,
        studentId,
      }),
  );

export const useUpdateLesson = () => useMutation(data => updateLesson(data));

export const useCreateLesson = () => useMutation(data => createLesson(data));
