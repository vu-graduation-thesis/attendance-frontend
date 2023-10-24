import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import { useGetStudentDetail } from "core/queries/student.ts";

const { Title, Text } = Typography;

interface Props {
  studentId: string;
}

export const StudentDetail = (props: Props) => {
  const { studentId } = props;
  const { t } = useTranslation();
  const { data } = useGetStudentDetail(studentId);

  return <></>;
};
