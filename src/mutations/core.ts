import { useMutation } from "react-query";

import { attendanceSession, uploadFaces } from "core/services/core.js";

export const useUploadFaces = () =>
  useMutation((images: string[]) => uploadFaces(images));

export const useAttendanceSession = () =>
  useMutation(({ image, lessionId }) => attendanceSession(lessionId, image));
