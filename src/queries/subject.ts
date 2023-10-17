import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getSubject } from "core/services/subject";
import { createSubject, updateSubject } from "core/services/subject";

export const useGetSubject = () =>
  useQuery(["get-subjects"], () => getSubject(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });

export const useUpdateSubject = () => useMutation(data => updateSubject(data));

export const useCreateSubject = () => useMutation(data => createSubject(data));
