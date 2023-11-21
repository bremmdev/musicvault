"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { BandWithDetails } from "@/types/types";
import { Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import deleteBand from "@/_actions/delete-band";

type Props = {
  bands: Array<BandWithDetails>;
};

type DeleteError = {
  message: string;
  id: string;
};

const BandsTable = ({ bands }: Props) => {
  const [deleteError, setDeleteError] = React.useState<DeleteError | null>(
    null
  );

  async function handleDelete(id: string) {
    setDeleteError(null);
    const res = await deleteBand(id);
    if (res?.error) {
      setDeleteError({
        message: res.error,
        id,
      });
      return;
    }
    setDeleteError(null);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Rating</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Country</TableHead>
          <TableHead className="text-center">Years Active</TableHead>
          <TableHead>Genres</TableHead>
          <TableHead className="w-12"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bands.map((band) => {
          const yearsActive = `${band.formedIn} ${
            band.disbandedIn ? `- ${band.disbandedIn}` : ""
          }`;
          const genres = band.genres.map((genre) => genre.name).join(", ");
          const hasDeleteError = deleteError?.id === band.id;

          return (
            <React.Fragment key={band.name}>
              <TableRow
                className={cn({
                  "border-none": hasDeleteError,
                  "hover:bg-transparent": hasDeleteError,
                })}
              >
                <TableCell className="w-12">
                  <Star
                    stroke="none"
                    className={cn("mx-auto", {
                      "fill-amber-200": band.rating.value === "excellent",
                      "fill-slate-300": band.rating.value === "good",
                      "fill-[#7F735F]": band.rating.value === "average",
                    })}
                  />
                </TableCell>
                <TableCell className="text-center">{band.name}</TableCell>
                <TableCell className="text-center">{band.country}</TableCell>
                <TableCell className="text-center">{yearsActive}</TableCell>
                <TableCell>{genres}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDelete(band.id)}
                    aria-label="delete band"
                  >
                    <Trash2
                      className="cursor-pointer w-6 h-6 stroke-slate-700 hover:stroke-red-700 transition-all"
                      strokeWidth={1}
                    />
                  </button>
                </TableCell>
              </TableRow>
              {hasDeleteError && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={6}
                    className="text-sm text-center w-full pt-0 text-rose-600 font-medium"
                  >
                    {deleteError.message}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BandsTable;
