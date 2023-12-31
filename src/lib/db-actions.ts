import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { cache } from "react";

export const getBandsWithDetails = cache(async () => {
  return await prisma.band.findMany({
    include: {
      genres: true,
      rating: true,
    },
    orderBy: {
      name: "asc",
    },
  });
});

export const getAlbumsWithDetails = cache(async () => {
  return await prisma.album.findMany({
    include: {
      genres: true,
      rating: true,
      band: true,
    },
    orderBy: [
      {
        band: {
          name: "asc",
        },
      },
      {
        yearReleased: "asc",
      },
    ],
  });
});

export const getBands = cache(async () => {
  return await prisma.band.findMany({
    orderBy: {
      name: "asc",
    },
  });
});

export const getRatings = cache(async () => {
  return await prisma.rating.findMany();
});

export const getGenres = cache(async () => {
  return await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });
});

export const getCreateOrUpdateDataDTO = cache(async (includeBands = false) => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }

  const [ratings, genres, bands] = await Promise.all([
    getRatings(),
    getGenres(),
    includeBands ? getBands() : null,
  ]);

  return {
    ratings,
    genres,
    bands,
  };
});
