export const revalidate = 5;

import { prisma } from "@/lib/db";
import BandsTable from "@/components/bands/BandsTable";

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

  const ratings = await prisma.rating.findMany();
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <h1 className="text-3xl font-extralight text-center mt-12 mb-6">Bands</h1>
      <BandsTable bands={bands} ratings={ratings} genres={genres} />
    </>
  );
}
