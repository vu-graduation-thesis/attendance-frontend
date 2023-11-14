import { useMutation } from "react-query";

import { batchCreateClassroom } from "core/services/classroom.js";
import { createClassroom, updateClassroom } from "core/services/classroom.ts";

export const useUpdateClassroom = () =>
  useMutation(data => updateClassroom(data));

export const useCreateClassroom = () =>
  useMutation(data => createClassroom(data));

export const useBatchCreateClassroom = () =>
  useMutation(data => batchCreateClassroom(data));
