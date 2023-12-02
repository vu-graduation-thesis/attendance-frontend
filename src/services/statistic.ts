import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const statisticsClassAttendanceStatus = async ({
  classId = "",
  startDate = "",
  endDate = "",
}) => {
  const res = await axiosInstance.get(
    `${configs.apiEndpoint}/statistics/classes/${classId}`,
    {
      params: {
        startDate,
        endDate,
      },
    },
  );
  return res.data?.data;
};


export const statisticStudentVerified = async () => {
  const res = await axiosInstance.get(
    `${configs.apiEndpoint}/students/verifyStatus`,
  );
  return res.data?.data;
}

export const countAttendanceByType = async () => {
  const res = await axiosInstance.get(
    `${configs.apiEndpoint}/statistics/classes/count-by-attdance-type`,
  );
  return res.data?.data;
}
