import { Outlet } from "react-router-dom";
import { MainHeader } from "./main-header";

const MainShell = () => {
  return (
    <div>
      <MainHeader />
      <main className="mt-header">
        <Outlet />
      </main>
    </div>
  );
};
export { MainShell };
