import { useMutation } from "react-query";

import { createClassroom, updateClassroom } from "core/services/classroom.ts";

export const useUpdateClassroom = () =>
  useMutation(data => updateClassroom(data));

export const useCreateClassroom = () =>
  useMutation(data => createClassroom(data));
