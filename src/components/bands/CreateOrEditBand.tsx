import { prisma } from "@/lib/db";
import CreateOrEditForm from "./CreateOrEditForm";

export default async function CreateOrEditBand() {
  const ratings = await prisma.rating.findMany();
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <CreateOrEditForm ratings={ratings} genres={genres} />;
}
