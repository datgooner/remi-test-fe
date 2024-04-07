import { MainShell } from "@/components/layouts/main-shell";
import { Notifications } from "@/components/notifications";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home/home-page";
import SharePage from "@/pages/share/share-page";
import "@/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";

const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainShell />
      <Toaster />
      <Notifications />
    </QueryClientProvider>
  );
};

const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route index element={<HomePage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/share" element={<SharePage />} />
    </Route>
  </Route>
);
const queryClient = new QueryClient();
function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
