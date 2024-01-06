"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import { BandWithDetails } from "@/types/types";
import deleteBand from "@/_actions/bands/delete-band";
import { useSession } from "next-auth/react";
import { useBandStore } from "@/store/store";
import Rating from "@/components/ui/Rating";
import StyledTableRow from "@/components/table/StyledTableRow";
import TableActions from "@/components/table/TableActions";
import TableError from "@/components/table/TableError";
import useOptimisticState from "@/hooks/useOptimisticState";

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
    tableHeaders,
  } = useBandStore();

  const { data: session, status: authStatus } = useSession();

  //optimistic updates for delete
  const [optimisticBands, setOptimisticBands] = useOptimisticState(bands);

  async function handleDelete(id: string) {
    setDeleteError(null);
    //optimistic update
    const newOptimisticBands = optimisticBands.filter((band) => band.id !== id);
    React.startTransition(() => {
      setOptimisticBands(newOptimisticBands);
    });
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

  const handleUpdate = (band: BandWithDetails) => {
    setSelectedBand(band);
    setShowForm(true);
    setDeleteError(null);
  };

  return (
    <>
      <Table className="text-xs md:text-sm">
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            {tableHeaders.map((tableHeader) => (
              <TableHead key={tableHeader}>{tableHeader}</TableHead>
            ))}
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
              <React.Fragment key={band.id}>
                <StyledTableRow
                  hasDeleteError={hasDeleteError}
                  rating={band.rating.value}
                >
                  <TableCell className="w-12">
                    <Rating rating={band.rating.value} />
                  </TableCell>
                  <TableCell>{band.name}</TableCell>
                  <TableCell>{band.country}</TableCell>
                  <TableCell>{yearsActive}</TableCell>
                  <TableCell>{genres}</TableCell>
                  <TableCell>{lastCheckText}</TableCell>
                  {authStatus === "authenticated" ? (
                    <TableActions
                      isDeleting={isDeleting}
                      onUpdate={handleUpdate.bind(null, band)}
                      onDelete={() => handleDelete(band.id)}
                    />
                  ) : (
                    <TableCell></TableCell>
                  )}
                </StyledTableRow>
                {hasDeleteError && <TableError error={deleteError.message} />}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default BandsTable;
