import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoModel } from "@/model/video.model";
import { memo } from "react";

interface YoutubeVideoProps extends VideoModel {}
const YoutubeVideo = memo(
  ({ embedUrl, title, description, createBy }: YoutubeVideoProps) => {
    return (
      <Card className="flex w-full flex-col space-y-8 p-4 md:flex-row md:space-x-8 md:space-y-0">
        <div className="flex-1">
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
            />
          </AspectRatio>
        </div>

        <div className="prose flex max-h-[50vh] flex-col md:w-[clamp(16rem,25vw,70rem)]">
          <h2>{title}</h2>
          <div>
            <Label className="text-base">Share by: </Label>
            <span className="font-semibold">{createBy.email}</span>
          </div>
          <Label className="mb-2 text-base">Description:</Label>
          <ScrollArea className="flex-1">
            <p className="mt-0 whitespace-pre-wrap break-words text-sm">
              {description}
            </p>
          </ScrollArea>
        </div>
      </Card>
    );
  }
);

export { YoutubeVideo };
