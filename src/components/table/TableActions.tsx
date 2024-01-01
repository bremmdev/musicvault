"use client";
import React from "react";

import { Pencil } from "lucide-react";
import { TableCell } from "../ui/table";
import DeleteButton from "../ui/DeleteButton";

type Props = {
  isDeleting: boolean;
  onUpdate: () => void;
  onDelete: () => void;
};

const TableActions = ({
  isDeleting,
  onUpdate,
  onDelete,
}: Props) => {
  return (
    <TableCell>
      <span className="flex gap-2">
        <button disabled={isDeleting}>
          <Pencil
            onClick={onUpdate}
            className="cursor-pointer w-5 h-5 stroke-slate-700 hover:stroke-black transition-all"
            strokeWidth={1}
          />
        </button>
        <DeleteButton
          onClick={onDelete}
          aria-label="delete band"
          disabled={isDeleting}
        ></DeleteButton>
      </span>
    </TableCell>
  );
};

export default TableActions;
