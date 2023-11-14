import { useMutation } from "react-query";

import { createSubject, updateSubject } from "core/services/subject";
import { batchCreateSubject } from "core/services/subject.js";

export const useUpdateSubject = () => useMutation(data => updateSubject(data));

export const useCreateSubject = () => useMutation(data => createSubject(data));

export const useBatchCreateSubject = () =>
  useMutation(data => batchCreateSubject(data));
