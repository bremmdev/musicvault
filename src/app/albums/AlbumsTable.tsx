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
import { Star, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import deleteAlbum from "@/_actions/albums/delete-album";
import DeleteButton from "@/components/ui/DeleteButton";
import { useSession } from "next-auth/react";
import useAlbumStore from "@/store/albums";

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

  const handleEditClick = (album: AlbumWithDetails) => {
    setSelectedAlbum(album);
    setShowForm(true);
    setDeleteError(null);
  };

  return (
    <>
      <Table className="text-xs md:text-sm">
        <TableHeader>
          <TableRow className="[&>th]:text-center">
            <TableHead>Rating</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Band</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticAlbums.map((album) => {
            const genres = album.genres.map((genre) => genre.name).join(", ");
            const hasDeleteError = deleteError?.id === album.id;

            return (
              <React.Fragment key={album.id}>
                <TableRow
                  className={cn(
                    {
                      "border-none hover:bg-transparent": hasDeleteError,
                      "font-medium bg-amber-50":
                        album.rating.value === "excellent",
                    },
                    "[&>td]:text-center"
                  )}
                >
                  <TableCell className="w-12">
                    <Star
                      stroke="none"
                      className={cn("mx-auto", {
                        "fill-amber-300": album.rating.value === "excellent",
                        "fill-slate-300": album.rating.value === "good",
                      })}
                    />
                  </TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell>{album.band.name}</TableCell>
                  <TableCell>{album.band.country}</TableCell>
                  <TableCell>{album.yearReleased}</TableCell>
                  <TableCell>{genres}</TableCell>
                  <TableCell>
                    {authStatus === "authenticated" ? (
                      <span className="flex gap-2">
                        <button disabled={isDeleting}>
                          <Pencil
                            onClick={handleEditClick.bind(null, album)}
                            className="cursor-pointer w-5 h-5 stroke-slate-700 hover:stroke-black transition-all"
                            strokeWidth={1}
                          />
                        </button>
                        <DeleteButton
                          onClick={() => handleDelete(album.id)}
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

export default AlbumsTable;
