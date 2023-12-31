import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getClasses } from "core/services/class";
import { createClass, updateClass } from "core/services/class.ts";

export const useGetClasses = (filter: any, enabled?: boolean) =>
  useQuery(["get-classes", filter], () => getClasses(filter), {
    staleTime: STALE_TIME.ONE_HOUR,
    enabled,
  });

export const useUpdateClass = () => useMutation(data => updateClass(data));

export const useCreateClass = () => useMutation(data => createClass(data));
