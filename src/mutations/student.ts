import { useMutation } from "react-query";

import { batchCreateStudent } from "core/services/student.js";
import { createStudent, updateStudent } from "core/services/student.ts";

export const useUpdateStudent = () =>
  useMutation((data: any) => updateStudent(data));

export const useCreateStudent = () => useMutation(data => createStudent(data));

export const useBatchCreateStudent = () =>
  useMutation(data => batchCreateStudent(data));
