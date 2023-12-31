import { useMutation, useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getLessons } from "core/services/lesson";

export const useGetLessons = (filter: any, enabled: boolean = true) =>
  useQuery(
    ["get-lessons", filter, filter.shortPolling],
    () => getLessons(filter),
    {
      staleTime: STALE_TIME.ONE_HOUR,
      enabled,
      refetchInterval: (_, query) => {
        const polling = query?.queryKey?.[2] || false;
        return polling;
      },
    },
  );
