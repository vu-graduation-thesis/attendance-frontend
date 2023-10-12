import { useMutation } from "react-query";
import { detectFace } from "core/services/faceRecognition.ts";

export const useDetectFace = () =>
  useMutation((image: string) => detectFace(image));
