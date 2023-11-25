import { Prisma } from '@prisma/client'

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