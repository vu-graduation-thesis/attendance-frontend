import { useMutation } from "react-query";

import { createTeacher, updateTeacher } from "core/services/teacher";

export const useUpdateTeacher = () => useMutation(data => updateTeacher(data));

export const useCreateTeacher = () => useMutation(data => createTeacher(data));
