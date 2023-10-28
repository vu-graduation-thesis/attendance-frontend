import { useMutation } from "react-query";

import { detectFace } from "core/services/faceRecognition.ts";

export const useDetectFace = () =>
  useMutation(({ file, lessonId }: { file: any; lessonId: string }) =>
    detectFace(lessonId, file),
  );
