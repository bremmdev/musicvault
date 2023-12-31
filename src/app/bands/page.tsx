export const dynamic = "force-dynamic";

import { getBandsWithDetails } from "@/lib/db-actions";
import BandsTable from "@/app/bands/BandsTable";
import CreateOrUpdateBand from "@/app/bands/CreateOrUpdateBand";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner";

export default async function BandsPage() {
  const bands = await getBandsWithDetails();

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Bands</h1>
      <BandsTable bands={bands} />
      <Suspense fallback={<Spinner />}>
        <CreateOrUpdateBand />
      </Suspense>
    </>
  );
}
