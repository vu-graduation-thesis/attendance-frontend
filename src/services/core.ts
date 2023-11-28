/* eslint-disable @typescript-eslint/naming-convention */
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

export const attendanceSession = async (lessionId: string, image: string, location: any) => {
  console.log(image);
  const res = await fetch(image);
  const imageBlob = await res.blob();

  // Tạo FormData để gửi dữ liệu
  const formData = new FormData();
  formData.append(`file`, imageBlob, `image-${Date.now()}.png`);
  formData.append(`latitude`, location.latitude);
  formData.append(`longitude`, location.longitude);

  const response = await axiosInstance.post(
    `${configs.apiEndpoint}/face-recognition/recognize/${lessionId}/student-upload-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
