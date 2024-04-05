import { Outlet } from "react-router-dom";
import { MainHeader } from "./main-header";
import { Toaster } from "../ui/toaster";

const MainShell = () => {
  return (
    <div>
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};
export { MainShell };
