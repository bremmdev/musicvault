import { Prisma } from '@prisma/client'
import { Session } from 'next-auth'

export type BandWithDetails = Prisma.BandGetPayload<{
  include: {
    genres: true
    rating: true
  }
}> 

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
    isAdmin: boolean
  }
}