import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { genres, ratings, bands } from "./seed-data";

//clear db before seeding
async function clearDatabase() {
  await prisma.$transaction([
    prisma.band.deleteMany(),
    prisma.rating.deleteMany(),
    prisma.genre.deleteMany(),
  ]);
}

async function createRatings() {
  await prisma.rating.createMany({
    data: ratings,
  });
}

async function createGenres() {
  await prisma.genre.createMany({
    data: genres,
  });
}

function createBands() {
  //can't use createMany because of the many-to-many relationship of genres
  return bands.map((band) => prisma.band.create({ data: band }));
}

async function seed() {
  await clearDatabase();
  await createRatings();
  await createGenres();
  await prisma.$transaction([...createBands()]);
}

seed();
