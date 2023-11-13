import { useMutation } from "react-query";

import { createTeacher, updateTeacher } from "core/services/teacher";
import { batchCreateTeacher } from "core/services/teacher.js";

export const useUpdateTeacher = () => useMutation(data => updateTeacher(data));

export const useCreateTeacher = () => useMutation(data => createTeacher(data));

export const useBatchCreateTeacher = () =>
  useMutation(data => batchCreateTeacher(data));
