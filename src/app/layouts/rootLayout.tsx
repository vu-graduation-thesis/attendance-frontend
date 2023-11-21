import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Capacitor } from "@capacitor/core";

import { useVerifyToken } from "core/queries/auth.js";
import { privateRoutes, publicRoutes } from "core/routes";

// import { QuickShortCut } from "../components/QuickShortCut";
import DefaultLayout from "./DefaultLayout";

const RootLayout = () => {
  const navigator = useNavigate();
  const token = localStorage.getItem("token");
  const { isError } = useVerifyToken(token as string);
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      navigator("/app/home");
    }
  }, []);

  useEffect(() => {
    if (!token || isError) {
      navigator(`/login?redirect=${window.location.href}`, {
        replace: true,
      });
    }
  }, [isError]);

  return (
    <div className="App">
      <Routes>
        {privateRoutes.map((route, index) => {
          const PageComponent = route.component;

          let Layout: any = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={`${index + route.path}`}
              path={route.path}
              element={
                <Layout>
                  <PageComponent />
                  {/* <QuickShortCut /> */}
                </Layout>
              }
            />
          );
        })}

        {publicRoutes.map((route, index) => {
          const PageComponent = route.component;

          let Layout: any = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={`${index + route.path}`}
              path={route.path}
              element={
                <Layout>
                  <PageComponent />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
};
export default RootLayout;
