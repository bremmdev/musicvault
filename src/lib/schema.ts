import z from "zod";

export const createBandSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long" }),
  formedIn: z
    .string()
    .regex(/^\d{4}$/, { message: "Formed in must be a valid year" }),
  disbandedIn: z
    .string()
    .regex(/^\d{4}$/, { message: "Disbanded in must be a valid year" })
    .nullable(),
  genres: z.array(z.string().min(1, { message: "Genre must be selected" })),
  ratingId: z.string().min(1, { message: "Rating must be selected" }),
});
