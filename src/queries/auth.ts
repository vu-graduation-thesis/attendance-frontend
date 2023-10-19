import { useQuery } from "react-query";

import { verifyToken } from "core/services/auth";

export const useVerifyToken = (token: string) =>
  useQuery(["verify-token", token], () => verifyToken(token), {
    enabled: !!token,
    cacheTime: 0,
  });
