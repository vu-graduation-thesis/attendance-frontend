import { useMutation } from "react-query";

import { login, loginWithGoogle } from "core/services/auth.js";

export const useLogin = () =>
  useMutation((body: any) =>
    body?.idToken
      ? loginWithGoogle(body?.idToken)
      : login(body?.username, body?.password),
  );
