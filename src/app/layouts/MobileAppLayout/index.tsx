import { ReactNode } from "react";

interface Props {
  children: JSX.Element;
}

function MobileAppLayout({ children }: Props): ReactNode {
  return (
    <div>
      {children}
    </div>
  );
}

export default MobileAppLayout;
