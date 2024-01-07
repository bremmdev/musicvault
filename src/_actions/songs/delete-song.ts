"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function deleteSong(id: string) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    await prisma.song.delete({
      where: { id: id },
    });
    revalidatePath("/songs");
  } catch (error) {
    return {
      error: "Deleting song failed",
    };
  }
}
