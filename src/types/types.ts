import { Prisma } from '@prisma/client'

export type BandWithDetails = Prisma.BandGetPayload<{
  include: {
    genres: true
    rating: true
  }
}> 
