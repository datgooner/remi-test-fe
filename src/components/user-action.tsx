import { useGetMe } from "@/hooks/query/useGetMe";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import Skeleton from "react-loading-skeleton";

const UserAction = () => {
  const { data: me, isLoading } = useGetMe();
  const logout = useAuthStore((state) => state.logout);
  return (
    <div className="flex items-center space-x-2 sm:space-x-6">
      <div className="hidden text-sm sm:block md:text-base">
        Welcome{" "}
        <span className="font-semibold">
          {isLoading ? (
            <span className="inline-block w-40" data-testid="loading-skeleton">
              <Skeleton />
            </span>
          ) : (
            me?.email
          )}
        </span>
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
