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
  lastChecked: z
    .date({
      invalid_type_error: "Last checked must be a valid date",
    })
    .nullable(),
  genres: z.array(z.string().min(1, { message: "Genre must be selected" })),
  ratingId: z.string().min(1, { message: "Rating must be selected" }),
});

export const updateBandSchema = createBandSchema.extend({
  id: z.string(),
});

export const createAlbumSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" }),
  imageUrl: z.string().nullable(),
  yearReleased: z
    .string()
    .regex(/^\d{4}$/, { message: "Year released must be a valid year" }),
  genres: z.array(z.string().min(1, { message: "Genre must be selected" })),
  bandId: z.string().min(1, { message: "Band must be selected" }),
  ratingId: z.string().min(1, { message: "Rating must be selected" }),
});

export const updateAlbumSchema = createAlbumSchema.extend({
  id: z.string(),
});

