"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { Prisma } from "@prisma/client";

export default async function deleteBand(id: string) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    await prisma.band.delete({
      where: { id: id },
    });
    revalidatePath("/bands");
  } catch (error) {
    let message = "Deleting band failed";
    //Foreign key constraint failed on the field album_bandId
    //We don't want to delete a band that has albums
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      message = "Cannot delete band with albums or songs";
    }

    return {
      error: message,
    };
  }
}
