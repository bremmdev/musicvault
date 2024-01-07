export const dynamic = "force-dynamic";

import React from "react";
import AlbumsTable from "./AlbumsTable";
import CreateOrUpdateAlbum from "./CreateOrUpdateAlbum";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import { getAlbumsWithDetails } from "@/lib/db-actions";

export default async function AlbumsPage() {
  const albums = await getAlbumsWithDetails();

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Albums</h1>
      <AlbumsTable albums={albums} />
      <Suspense fallback={<Spinner />}>
        <CreateOrUpdateAlbum />
      </Suspense>
    </>
  );
}
