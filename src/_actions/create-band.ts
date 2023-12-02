"use server";

import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { createBandSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export default async function createBand(data: unknown) {
  const parsed = createBandSchema.safeParse(data);

  //return zod errors if server-side validation fails
  if (!parsed.success) {
    return {
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  //get the genre ids from the formData and connect them to the band
  const createData = {
    ...parsed.data,
    genres: {
      connect: parsed.data.genres.map((id) => ({ id: id })),
    },
  };

  try {
    await prisma.band.create({
      data: createData,
    });
    revalidatePath("/bands");
  } catch (error) {
    let message = ["Server error"];

    //unique constraint of [name, country] failed
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      message[0] = "Band already exists";
    }

    return {
      errors: message,
    };
  }
}
