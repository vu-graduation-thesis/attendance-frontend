import axios from "axios";

import configs from "core/configs/index.js";

export const detectFace = async (image: string) => {
  console.log("image", image);
  const blob = await fetch(image).then(res => res.blob());
  // Tạo FormData để gửi dữ liệu
  const formData = new FormData();
  formData.append(`image`, blob, `image${new Date().getTime()}.png`);

  const response = await axios.post(
    `${configs.apiEndpoint}/detect-face`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
