import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import configs from "core/configs";
import { privateRoutes } from "core/routes";

import DefaultLayout from "./DefaultLayout";
import MobileAppLayout from "./MobileAppLayout";

const RootLayout = () => {
  return (
    <div className="App">
      <Routes>
        {privateRoutes.map((route, index) => {
          const PageComponent = route.component;

          let Layout: any =
            configs.mode === "HYBRID_APP" ? MobileAppLayout : DefaultLayout;

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
