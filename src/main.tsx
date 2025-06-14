import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "./index.css";
import App from "./App.tsx";
import { store, persistor } from "./stores/index.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
// import { AppWrapper } from "./providers/AppWrapper.tsx";
import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
