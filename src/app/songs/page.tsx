export const dynamic = "force-dynamic";

import { getSongsWithDetails } from "@/lib/db-actions";
import SongsTable from "@/app/songs/SongsTable";
import CreateOrUpdateSong from "@/app/songs/CreateOrUpdateSong";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

export default async function SongsPage() {
  const songs = await getSongsWithDetails();

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-8 mb-4">Songs</h1>
      <SongsTable songs={songs} />
      <Suspense fallback={<Spinner />}>
        <CreateOrUpdateSong />
      </Suspense>
    </>
  );
}
