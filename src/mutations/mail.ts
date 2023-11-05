import { useMutation } from "react-query";

import { sendMail } from "core/services/mail.js";

export const useSendMail = () => useMutation((data: any) => sendMail(data));
