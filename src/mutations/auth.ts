import { useMutation } from "react-query";

import { login } from "core/services/auth.js";

export const useLogin = () =>
  useMutation(({ username, password }: any) => login(username, password));
