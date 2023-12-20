export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import BandsTable from "@/app/bands/BandsTable";
import CreateOrEditBand from "@/app/bands/CreateOrEditBand";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

export default async function BandsPage() {
  const bands = await prisma.band.findMany({
    include: {
      genres: true,
      rating: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Bands</h1>
      <BandsTable bands={bands} />
      <Suspense fallback={<Spinner />}>
        <CreateOrEditBand />
      </Suspense>
    </>
  );
}
