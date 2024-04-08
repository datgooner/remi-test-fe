import { MainShell } from "@/components/layouts/main-shell";
import { Notifications } from "@/components/notifications";
import { ProtectedRoute } from "@/components/route/protected-route";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home/home-page";
import SharePage from "@/pages/share/share-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "react-loading-skeleton/dist/skeleton.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/global.css";

const queryClient = new QueryClient();
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
function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
