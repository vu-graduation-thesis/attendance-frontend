/* eslint-disable @typescript-eslint/naming-convention */
import axios from "axios";

import configs from "core/configs/index.js";
import axiosInstance from "core/utils/api/axiosInstance.js";

export const uploadFaces = async (images: string[]) => {
  const fetchImages = images.map(image => fetch(image).then(res => res.blob()));
  const imageResponse = await Promise.allSettled(fetchImages);
  const imageBlobs = imageResponse.map((item: any) => item.value);

  console.log(imageBlobs);

  // Tạo FormData để gửi dữ liệu
  const formData = new FormData();
  imageBlobs.forEach((blob, index) => {
    formData.append(`files`, blob, `image${index + 1}.png`);
  });

  const response = await axiosInstance.post(
    `${configs.apiEndpoint}/face-recognition/training`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
