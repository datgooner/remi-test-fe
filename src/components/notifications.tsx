import { SocketEvent } from "@/constants/enum";
import { SOCKET_URL } from "@/constants/environment";
import { useGetMe } from "@/hooks/query/useGetMe";
import { VideoModel } from "@/model/video.model";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "./ui/use-toast";

const Notifications = () => {
  const isLoggedIn = useAuthStore((state) => !!state.token);
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoggedIn && me) {
      const socket = io(SOCKET_URL, {
        query: {
          userId: me._id,
        },
      });
      socket.on(SocketEvent.Notification, (data) => {
        const video = data.data as VideoModel;
        toast({
          title: data.message,
          description: (
            <div>
              <div className="mb-2">
                Share by:{" "}
                <span className="font-semibold">{video.createBy.email}</span>
              </div>
              <div>{video.title}</div>
              <Link
                to="/"
                className="font-semibold underline"
                onClick={() => {
                  window.scroll({ top: 0, behavior: "smooth" });
                }}
              >
                Check it out!
              </Link>
            </div>
          ),
        });
        queryClient.invalidateQueries({ queryKey: ["getVideos"] });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [isLoggedIn, me, queryClient]);

  return null;
};

export { Notifications };
