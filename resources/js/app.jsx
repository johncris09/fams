import "../css/app.css";
import 'react-toastify/dist/ReactToastify.css'
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App {...props} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  },
  progress: {
    color: "#4B5563",
  },
});
