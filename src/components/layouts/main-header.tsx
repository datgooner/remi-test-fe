import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthForm } from "../auth-form";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserAction } from "../user-action";

const MainHeader = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex h-header items-center justify-between bg-white px-4 shadow sm:px-8">
      <Link
        to="/"
        className="prose flex items-center space-x-2 sm:mr-4 md:mr-0"
      >
        <HomeIcon className="size-10" />
        <h1 className="hidden text-2xl sm:inline lg:text-4xl">Funny movies</h1>
      </Link>
      {isLoggedIn ? <UserAction /> : <AuthForm />}
    </header>
  );
};
export { MainHeader };
