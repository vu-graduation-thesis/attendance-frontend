import { useMutation } from "react-query";

import { createSubject, updateSubject } from "core/services/subject";

export const useUpdateSubject = () => useMutation(data => updateSubject(data));

export const useCreateSubject = () => useMutation(data => createSubject(data));
