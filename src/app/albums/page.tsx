import React from "react";
import { prisma } from "@/lib/db";
import AlbumsTable from "./AlbumsTable";
import CreateOrEditAlbum from "./CreateOrEditAlbum";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

export default async function AlbumsPage() {
  const albums = await prisma.album.findMany({
    include: {
      genres: true,
      rating: true,
      band: true,
    },
    orderBy: [
      {
        band: {
          name: "asc",
        },
      },
      {
        yearReleased: "asc",
      },
    ],
  });

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Albums</h1>
      <AlbumsTable albums={albums} />
      <Suspense fallback={<Spinner />}>
        <CreateOrEditAlbum />
      </Suspense>
    </>
  );
}
