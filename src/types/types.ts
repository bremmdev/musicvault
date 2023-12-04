import { Prisma } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export type BandWithDetails = Prisma.BandGetPayload<{
  include: {
    genres: true;
    rating: true;
  };
}>;

export type DeleteError = {
  message: string;
  id: string;
};

export type User = {
  name: string;
  email: string;
  image: string;
  isAdmin?: boolean;
};

export type SessionWithAdmin = Session & {
  user: {
    isAdmin: boolean;
  };
};

export interface Token extends JWT {
  isAdmin?: boolean;
}

export interface UserWithAdmin extends User {
  isAdmin?: boolean;
}
