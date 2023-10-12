import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "core/styles";

import RootLayout from "./layouts/rootLayout";

const queryClient = new QueryClient();

function successCallback(result: any) {
  console.log("SafeArea: " + JSON.stringify(result));
  document.body.style.paddingTop = result.top + "px";
}

function onDeviceReady() {
  (window as any).plugins?.safearea.get(successCallback, (error: any) =>
    console.log(JSON.stringify(error)),
  );
}

document.addEventListener("deviceready", onDeviceReady, false);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <GlobalStyles>
          <RootLayout />
        </GlobalStyles>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
