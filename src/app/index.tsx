import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "core/styles";

import RootLayout from "./layouts/rootLayout";

const queryClient = new QueryClient();

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
