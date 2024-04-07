import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { type SVGAttributes } from "react";

const Loading = ({ className, ...props }: SVGAttributes<unknown>) => {
  return <Loader2Icon className={cn("animate-spin", className)} {...props} />;
};
export { Loading };
