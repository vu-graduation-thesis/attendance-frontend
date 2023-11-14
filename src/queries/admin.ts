import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getAdmins } from "core/services/admin";
import { createAdmin, updateAdmin } from "core/services/admin.ts";

export const useGetAdmins = () =>
  useQuery(["get-admins"], () => getAdmins(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useUpdateAdmin = () => useMutation(data => updateAdmin(data));

export const useCreateAdmin = () => useMutation(data => createAdmin(data));
