import { prisma } from "@/lib/db";
import CreateOrEditBandForm from "./CreateOrEditBandForm";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function CreateOrEditBand() {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const ratings = await prisma.rating.findMany();
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <CreateOrEditBandForm ratings={ratings} genres={genres} />;
}
