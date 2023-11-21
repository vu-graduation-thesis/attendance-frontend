import { useQuery } from "react-query";

import { STALE_TIME } from "core/constants";
import { getUserInfo } from "core/services";
import { getAccessToken } from "core/utils/storage.ts";

export const useGetUserInfo = () =>
  useQuery(["get-user-info", getAccessToken()], () => getUserInfo(), {
    staleTime: STALE_TIME.ONE_HOUR,
  });
