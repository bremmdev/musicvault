import { prisma } from "@/lib/db";
import CreateOrEditForm from "./CreateOrEditForm";
import { AuthOptions } from "@/app/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export default async function CreateOrEditBand() {
  const session = await getServerSession(AuthOptions);

  const isAdmin = session?.user?.isAdmin

  if (!isAdmin) {
    return null;
  }

  const ratings = await prisma.rating.findMany();
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <CreateOrEditForm ratings={ratings} genres={genres} />;
}
