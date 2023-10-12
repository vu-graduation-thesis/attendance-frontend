import axios from "axios";

export const detectFace = async (image: string) => {
  const blob = await fetch(image).then(res => res.blob());
  // Tạo FormData để gửi dữ liệu
  const formData = new FormData();
  formData.append(`image`, blob, `image${new Date().getTime()}.png`);

  const response = await axios.post(
    "http://localhost:5000/detect-face",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
