import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import { privateRoutes, publicRoutes } from "core/routes";

// import { QuickShortCut } from "../components/QuickShortCut";
import DefaultLayout from "./DefaultLayout";

const RootLayout = () => {
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
                  {/* <QuickShortCut /> */}
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
