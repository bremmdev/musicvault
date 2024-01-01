import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  rating: string;
};

const Rating = ({ rating }: Props) => {
  return (
    <Star
      stroke="none"
      className={cn("mx-auto", {
        "fill-amber-300": rating === "excellent",
        "fill-slate-300": rating === "good",
        "fill-[#7F735F]": rating === "average",
      })}
    />
  );
};

export default Rating;