import { useGetMe } from "@/hooks/query/useGetMe";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";

const UserAction = () => {
  const { data: me } = useGetMe();
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="flex items-center space-x-6">
      <div className="hidden md:block">
        Welcome <span className="font-semibold">{me?.email}</span>
      </div>
      <Button asChild>
        <Link to="/share">Share a movie</Link>
      </Button>
      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export { UserAction };
