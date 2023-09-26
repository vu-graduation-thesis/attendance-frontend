import { ReactNode } from "react";

interface Props {
  children: JSX.Element;
}

function NoLayout({ children }: Props): ReactNode {
  return <>{children}</>;
}

export default NoLayout;
