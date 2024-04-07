import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthForm } from "./auth-form";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserAction } from "./user-action";

const MainHeader = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);

  return (
    <header className="h-header fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-white px-8 shadow">
      <Link to="/" className="prose mr-4 flex items-center space-x-2 md:mr-0">
        <HomeIcon className="size-10" />
        <h1 className="hidden md:inline">Funny movies</h1>
      </Link>
      {isLoggedIn ? <UserAction /> : <AuthForm />}
    </header>
  );
};
export { MainHeader };
