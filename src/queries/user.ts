import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getUserInfo } from "core/services";

export const useGetUserInfo = () =>
  useQuery(["get-user-info"], () => getUserInfo(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
