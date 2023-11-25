import React from "react";

type Props = React.ComponentPropsWithoutRef<"button">;

import { Trash2 } from "lucide-react";

const DeleteButton = (props: Props) => {
  return (
    <button {...props}>
      <Trash2
        className="cursor-pointer w-5 h-5 stroke-slate-700 hover:stroke-red-700 transition-all"
        strokeWidth={1}
      />
    </button>
  );
};

export default DeleteButton;
