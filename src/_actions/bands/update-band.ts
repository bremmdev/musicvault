"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { updateBandSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function updateBand(data: unknown) {
  const parsed = updateBandSchema.safeParse(data);
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
    await prisma.band.update({
      where: { id: parsed.data.id },
      data: updateData,
    });
    revalidatePath("/bands");
  } catch (error) {
    let message = "Server error";

    //unique constraint of [name, country] failed
    //when updating we don't want this band to have the same name and country as another band
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      message = "Band already exists";
    }

    return {
      error: message,
    };
  }
}
