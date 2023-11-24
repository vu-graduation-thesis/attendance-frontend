import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Capacitor } from "@capacitor/core";

import { Header } from "core/app/components/Header";
import { Sidebar } from "core/app/components/Sidebar";
import { routeConfig } from "core/routes/routeConfig.ts";

interface Props {
  children: JSX.Element;
}

function DefaultLayout({ children }: Props): ReactNode {
  const navigate = useNavigate();
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      navigate(routeConfig.mobile.schedule);
    }
  }, []);

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
