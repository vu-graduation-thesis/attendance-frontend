import { useMutation } from "react-query";

import { changePassword, login, loginWithGoogle } from "core/services/auth.js";

export const useLogin = () =>
  useMutation((body: any) =>
    body?.idToken
      ? loginWithGoogle(body?.idToken)
      : login(body?.username, body?.password),
  );

export const useChangePassword = () =>
  useMutation(data => changePassword(data));
