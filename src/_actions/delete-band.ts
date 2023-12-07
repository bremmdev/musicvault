"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function deleteBand(id: string) {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return {
      errors: ["Not authenticated"],
    };
  }

  try {
    await prisma.band.delete({
      where: { id: id },
    });
    revalidatePath("/bands");
  } catch (error) {
    return {
      error: "Deleting band failed",
    };
  }
}
