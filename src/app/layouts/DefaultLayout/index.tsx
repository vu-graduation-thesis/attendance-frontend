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

        <div
          style={{
            overflowY: "auto",
            height: "calc(100vh - 85px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
