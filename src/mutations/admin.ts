import { useMutation } from "react-query";

import { createAdmin, updateAdmin } from "core/services/admin";

export const useUpdateAdmin = () => useMutation(data => updateAdmin(data));

export const useCreateAdmin = () => useMutation(data => createAdmin(data));
