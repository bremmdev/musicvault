import { prisma } from "@/lib/db";
import CreateOrEditAlbumForm from "./CreateOrEditAlbumForm";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

export default async function CreateOrEditAlbum() {
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
  const bands = await prisma.band.findMany({});

  return <CreateOrEditAlbumForm ratings={ratings} genres={genres} bands={bands} />;
}
