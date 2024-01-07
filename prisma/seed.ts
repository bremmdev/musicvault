import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { genres, ratings, bands, albums, songs, users } from "./seed-data";

//clear db before seeding
async function clearDatabase() {
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.song.deleteMany(),
    prisma.album.deleteMany(),
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

async function createUsers() {
  await prisma.user.createMany({
    data: users,
  });
}

function createBands() {
  //can't use createMany because of the many-to-many relationship of genres
  return bands.map((band) => prisma.band.create({ data: band }));
}

function createAlbums() {
  //can't use createMany because of the many-to-many relationship of genres
  return albums.map((album) => prisma.album.create({ data: album }));
}

function createSongs() {
  //can't use createMany because of the many-to-many relationship of genres
  return songs.map((song) => prisma.song.create({ data: song }));
}

async function seed() {
  await clearDatabase();
  await createUsers();
  await createRatings();
  await createGenres();
  await prisma.$transaction([...createBands()]);
  await prisma.$transaction([...createAlbums()]);
  await prisma.$transaction([...createSongs()]);
}

seed();
