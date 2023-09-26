import { useMutation } from "react-query";

import { uploadFaces } from "core/services/core.js";

export const useUploadFaces = () =>
  useMutation((images: string[]) => uploadFaces(images));
