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
import { SongWithDetails } from "@/types/types";
import deleteSong from "@/_actions/songs/delete-song";
import { useSession } from "next-auth/react";
import { useSongStore } from "@/store/store";
import Rating from "@/components/ui/Rating";
import StyledTableRow from "@/components/table/StyledTableRow";
import TableActions from "@/components/table/TableActions";
import TableError from "@/components/table/TableError";
import useOptimisticState from "@/hooks/useOptimisticState";

type Props = {
  songs: Array<SongWithDetails>;
  children?: React.ReactNode;
};

const SongsTable = ({ songs }: Props) => {
  const {
    setShowForm,
    isDeleting,
    setIsDeleting,
    setSelectedSong,
    deleteError,
    setDeleteError,
    tableHeaders,
  } = useSongStore();

  const { data: session, status: authStatus } = useSession();

  //optimistic updates for delete
  const [optimisticSongs, setOptimisticSongs] = useOptimisticState(songs);

  async function handleDelete(id: string) {
    setDeleteError(null);
    //optimistic update
    const newOptimisticSongs = optimisticSongs.filter((song) => song.id !== id);
    React.startTransition(() => {
      setOptimisticSongs(newOptimisticSongs);
    });
    setIsDeleting(true);
    const res = await deleteSong(id);
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

  const handleUpdate = (song: SongWithDetails) => {
    setSelectedSong(song);
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
          {optimisticSongs.map((song) => {
           const genres = song.genres.map((genre) => genre.name).join(", ");
           const hasDeleteError = deleteError?.id === song.id;
            return (
              <React.Fragment key={song.id}>
                <StyledTableRow
                  hasDeleteError={hasDeleteError}
                  rating={song.rating.value}
                >
                  <TableCell className="w-12">
                    <Rating rating={song.rating.value} />
                  </TableCell>
                  <TableCell>{song.title}</TableCell>
                  <TableCell>{song.album.band.name}</TableCell>
                  <TableCell>{song.album.title}</TableCell>
                  <TableCell>{song.yearReleased}</TableCell>
                  <TableCell>{genres}</TableCell>
                  {authStatus === "authenticated" ? (
                    <TableActions
                      isDeleting={isDeleting}
                      onUpdate={handleUpdate.bind(null, song)}
                      onDelete={() => handleDelete(song.id)}
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

export default SongsTable;
