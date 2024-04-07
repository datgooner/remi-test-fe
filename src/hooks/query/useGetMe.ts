import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";

const useGetMe = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);
  return useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
    enabled: isLoggedIn,
  });
};

export { useGetMe };
