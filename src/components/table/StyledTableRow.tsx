"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TableRow } from "@/components/ui/table";

type Props = {
  hasDeleteError: boolean;
  rating: string;
  children: React.ReactNode;
};

const StyledTableRow = ({ hasDeleteError, rating, children }: Props) => {
  return (
    <TableRow
      className={cn(
        {
          "border-none hover:bg-transparent": hasDeleteError,
          "font-medium bg-amber-50": rating === "excellent",
        },
        "[&>td]:text-center"
      )}
    >
      {children}
    </TableRow>
  );
};

export default StyledTableRow;
