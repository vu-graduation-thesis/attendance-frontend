import { useMutation } from "react-query";

import { createClass, updateClass } from "core/services/class.ts";

export const useUpdateClass = () => useMutation(data => updateClass(data));

export const useCreateClass = () => useMutation(data => createClass(data));
