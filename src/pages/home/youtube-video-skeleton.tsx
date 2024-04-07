import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";

const YoutubeVideoSkeleton = () => {
  return (
    <Card className="flex w-full flex-col space-y-8 p-4 md:flex-row md:space-x-8 md:space-y-0">
      <div className="flex-1">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </div>
      <div className="prose flex max-h-[50vh] flex-col md:w-[clamp(16rem,25vw,70rem)]">
        <Skeleton className="w-10" count={10} />
      </div>
    </Card>
  );
};
export { YoutubeVideoSkeleton };
