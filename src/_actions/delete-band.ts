"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function deleteBand(id: string) {
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
