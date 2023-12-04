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
import { Star, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import deleteBand from "@/_actions/delete-band";
import DeleteButton from "../ui/DeleteButton";
import { useSession } from 'next-auth/react'
import useBandStore from "@/store/bands";
import { SessionWithAdmin } from "@/types/types";

type Props = {
  bands: Array<BandWithDetails>;
  children?: React.ReactNode;
};

const BandsTable = ({ bands }: Props) => {
  const {
    setShowForm,
    isDeleting,
    setIsDeleting,
    setSelectedBand,
    deleteError,
    setDeleteError,
  } = useBandStore();

  //optimistic updates for delete
  const [optimisticBands, setOptimisticBands] = React.useOptimistic(
    bands,
    (state, newBands: Array<BandWithDetails>) => newBands
  );

  const { data: session } = useSession() 
  const isAdmin = (session as SessionWithAdmin)?.user?.isAdmin!

  //reset optimistic bands when bands change
  React.useEffect(() => {
    React.startTransition(() => {
      setOptimisticBands(bands);
    });
  }, [bands, setOptimisticBands]);

  async function handleDelete(id: string) {
    setDeleteError(null);
    //optimistic update
    const newOptimisticBands = optimisticBands.filter((band) => band.id !== id);
    setOptimisticBands(newOptimisticBands);
    setIsDeleting(true);
    const res = await deleteBand(id);
    if (res?.error) {
      setDeleteError({
        message: res.error,
        id,
      });
      setIsDeleting(false);
      return;
    }
    setDeleteError(null);
    setIsDeleting(false);
  }

  const handleEditClick = (band: BandWithDetails) => {
    setSelectedBand(band);
    setShowForm(true);
    setDeleteError(null);
  };

  return (
    <>
      <Table className="text-xs md:text-sm">
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead>Rating</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Years Active</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead>Last Checked</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticBands.map((band) => {
            const yearsActive = `${band.formedIn} ${
              band.disbandedIn ? `- ${band.disbandedIn}` : ""
            }`;
            const genres = band.genres.map((genre) => genre.name).join(", ");
            const hasDeleteError = deleteError?.id === band.id;
            const lastCheckText = band.lastChecked
              ? band.lastChecked.toLocaleDateString("en-US")
              : "-";

            return (
              <React.Fragment key={band.name}>
                <TableRow
                  className={cn(
                    {
                      "border-none hover:bg-transparent": hasDeleteError,
                      "font-medium bg-amber-50":
                        band.rating.value === "excellent",
                    },
                    "[&>td]:text-center"
                  )}
                >
                  <TableCell className="w-12">
                    <Star
                      stroke="none"
                      className={cn("mx-auto", {
                        "fill-amber-300": band.rating.value === "excellent",
                        "fill-slate-300": band.rating.value === "good",
                        "fill-[#7F735F]": band.rating.value === "average",
                      })}
                    />
                  </TableCell>
                  <TableCell>{band.name}</TableCell>
                  <TableCell>{band.country}</TableCell>
                  <TableCell>{yearsActive}</TableCell>
                  <TableCell>{genres}</TableCell>
                  <TableCell>{lastCheckText}</TableCell>
                  <TableCell>
                    {isAdmin ? (
                    <span className="flex gap-2">
                      <button disabled={isDeleting}>
                        <Pencil
                          onClick={handleEditClick.bind(null, band)}
                          className="cursor-pointer w-5 h-5 stroke-slate-700 hover:stroke-black transition-all"
                          strokeWidth={1}
                        />
                      </button>
                      <DeleteButton
                        onClick={() => handleDelete(band.id)}
                        aria-label="delete band"
                        disabled={isDeleting}
                      ></DeleteButton>
                    </span>
                    ) : null}
                  </TableCell>
                </TableRow>
                {hasDeleteError && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={7}
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
    </>
  );
};

export default BandsTable;
