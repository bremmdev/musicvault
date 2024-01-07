"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { updateSongSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function updateSong(data: unknown) {
  const parsed = updateSongSchema.safeParse(data);
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return {
      error: "Not authenticated",
    };
  }

  //return zod errors if server-side validation fails
  if (!parsed.success) {
    return {
      error: parsed.error.issues.map((issue) => issue.message),
    };
  }

  //get the genre ids from the formData and connect them to the band
  const updateData = {
    ...parsed.data,
    genres: {
      connect: parsed.data.genres.map((id) => ({ id: id })),
    },
  };

  try {
    await prisma.song.update({
      where: { id: parsed.data.id },
      data: updateData,
    });
    revalidatePath("/songs");
  } catch (error) {
    let message = "Server error";

    //unique constraint of [title, bandId] failed
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      message = "Song already exists";
    }

    return {
      error: message,
    };
  }
}
