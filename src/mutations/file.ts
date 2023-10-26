import { useMutation } from "react-query";

import { getSignedUrls } from "core/services/file.js";

export const useGetSignedUrls = () =>
  useMutation(
    ({
      bucket,
      files,
      folder,
    }: {
      bucket: string;
      files?: string[];
      folder?: string;
    }) =>
      getSignedUrls({
        bucket,
        files,
        folder,
      }),
  );
