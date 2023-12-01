export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import BandsTable from "@/components/bands/BandsTable";
import CreateOrEditBand from "@/components/bands/CreateOrEditBand";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

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

  const fallback = (
    <div className="flex justify-center items-center my-8">
      <Loader2 className="animate-spin h-10 w-10 text-slate-950" />
    </div>
  );

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Bands</h1>
      <BandsTable bands={bands} />
      <Suspense fallback={fallback}>
        <CreateOrEditBand />
      </Suspense>
    </>
  );
}
