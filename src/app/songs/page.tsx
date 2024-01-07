export const dynamic = "force-dynamic";

import React from "react";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";
import { getSongsWithDetails } from "@/lib/db-actions";
import SongsTable from "./SongsTable";

export default async function SongsPage() {
  const songs = await getSongsWithDetails();

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Songs</h1>
      <SongsTable songs={songs} />
      {/* <Suspense fallback={<Spinner />}>
        <CreateOrUpdateAlbum />
      </Suspense> */}
    </>
  );
}
