import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainShell } from "@/components/layouts/main-shell";
import HomePage from "@/pages/home/home-page";

const routes = createRoutesFromElements(
  <Route element={<MainShell />}>
    <Route path="/" element={<HomePage />}>
      {/* <Route path="share" lazy={() => import("./pages/share/share-page")} /> */}
    </Route>
  </Route>
);

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
