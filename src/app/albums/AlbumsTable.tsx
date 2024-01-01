"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AlbumWithDetails } from "@/types/types";
import deleteAlbum from "@/_actions/albums/delete-album";
import { useSession } from "next-auth/react";
import { useAlbumStore } from "@/store/store";
import Rating from "@/components/ui/Rating";
import StyledTableRow from "@/components/table/StyledTableRow";
import TableActions from "@/components/table/TableActions";
import TableError from "@/components/table/TableError";

type Props = {
  albums: Array<AlbumWithDetails>;
  children?: React.ReactNode;
};

const AlbumsTable = ({ albums }: Props) => {
  const {
    setShowForm,
    isDeleting,
    setIsDeleting,
    setSelectedAlbum,
    deleteError,
    setDeleteError,
    tableHeaders,
  } = useAlbumStore();

  //optimistic updates for delete
  const [optimisticAlbums, setOptimisticAlbums] = React.useOptimistic(
    albums,
    (state, newAlbums: Array<AlbumWithDetails>) => newAlbums
  );

  const { data: session, status: authStatus } = useSession();

  //reset optimistic albums when bands change
  React.useEffect(() => {
    React.startTransition(() => {
      setOptimisticAlbums(albums);
    });
  }, [albums, setOptimisticAlbums]);

  async function handleDelete(id: string) {
    setDeleteError(null);
    //optimistic update
    const newOptimisticAlbums = optimisticAlbums.filter(
      (album) => album.id !== id
    );
    React.startTransition(() => {
      setOptimisticAlbums(newOptimisticAlbums);
    });
    setIsDeleting(true);
    const res = await deleteAlbum(id);
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

  const handleUpdate = (album: AlbumWithDetails) => {
    setSelectedAlbum(album);
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
          {optimisticAlbums.map((album) => {
            const genres = album.genres.map((genre) => genre.name).join(", ");
            const hasDeleteError = deleteError?.id === album.id;

            return (
              <React.Fragment key={album.id}>
                <StyledTableRow
                  hasDeleteError={hasDeleteError}
                  rating={album.rating.value}
                >
                  <TableCell className="w-12">
                    <Rating rating={album.rating.value} />
                  </TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell>{album.band.name}</TableCell>
                  <TableCell>{album.band.country}</TableCell>
                  <TableCell>{album.yearReleased}</TableCell>
                  <TableCell>{genres}</TableCell>

                  {authStatus === "authenticated" ? (
                    <TableActions
                      isDeleting={isDeleting}
                      onUpdate={handleUpdate.bind(null, album)}
                      onDelete={() => handleDelete(album.id)}
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

export default AlbumsTable;
