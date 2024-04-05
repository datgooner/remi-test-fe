import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthForm } from "./auth-form";

const MainHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between px-8 shadow">
      <Link to="/" className="prose flex items-center space-x-2">
        <HomeIcon className="size-10" />
        <h1>Funny movies</h1>
      </Link>
      <AuthForm />
    </header>
  );
};
export { MainHeader };
