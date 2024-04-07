import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { VideoModel } from "@/model/video.model";

interface YoutubeVideoProps extends VideoModel {}
const YoutubeVideo = ({
  embedUrl,
  title,
  description,
  createBy,
}: YoutubeVideoProps) => {
  return (
    <Card className="p-4 flex w-full flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0">
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-[45vh] md:w-[50vw] max-h-[260px] md:max-h-[768px] md:max-w-[1024px]"
      />

      <div className="prose min-w-[380px] flex-1">
        <h2>{title}</h2>
        <div>
          <Label className="text-base">Share by: </Label>
          <span className="font-semibold">{createBy.email}</span>
        </div>

        <Label className="text-base mb-0">Description:</Label>
        <p className="text-sm mt-0">{description}</p>
      </div>
    </Card>
  );
};

export { YoutubeVideo };
