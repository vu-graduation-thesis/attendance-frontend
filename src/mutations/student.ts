import { useMutation } from "react-query";

import { createStudent, updateStudent } from "core/services/student.ts";

export const useUpdateStudent = () =>
  useMutation((data: any) => updateStudent(data));

export const useCreateStudent = () => useMutation(data => createStudent(data));
