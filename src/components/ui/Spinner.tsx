import React from "react";
import { Loader2 } from "lucide-react";

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

type Props = {
  size?: "sm" | "md" | "lg";
};

const Spinner = ({ size }: Props) => {
  if (!size) {
    size = "md";
  }

  const dimensionClasses = sizeClasses[size];

  return (
    <div className={`flex justify-center items-center my-8`}>
      <Loader2 className={`animate-spin ${dimensionClasses} text-slate-950`} />
    </div>
  );
};

export default Spinner;
