import { ReactNode } from "react";

import { Header } from "core/app/components/Header";
import { Sidebar } from "core/app/components/Sidebar";

interface Props {
  children: JSX.Element;
}

function DefaultLayout({ children }: Props): ReactNode {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Header />

        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
