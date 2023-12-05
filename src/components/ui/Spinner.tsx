import React from "react";
import { Loader2 } from "lucide-react";

type Props = {
  width?: number;
};

const Spinner = ({ width }: Props) => {
  const dimensionClasses = width ? `h-[${width}] w-[${width}]` : "h-10 w-10";

  return (
    <div className="flex justify-center items-center my-8">
      <Loader2 className={`animate-spin ${dimensionClasses} text-slate-950`} />
    </div>
  );
};

export default Spinner;
