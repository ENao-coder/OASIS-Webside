import { z } from "zod";

export const createImageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().min(1, "Description is required").max(5000),
  category: z.enum(
    [
      "Conference",
      "Popularization of Science",
      "Group Photos",
      "Trips",
      "Achievements",
      "Science",
      "Others",
    ],
    { message: "Invalid category" },
  ),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  tags: z.array(z.string()).optional(),
});

export const updateImageSchema = z.object({
  url: z.string().url("Invalid image URL").optional(),
  title: z.string().min(1, "Title is required").max(100).optional(),
  description: z.string().min(1, "Description is required").max(500).optional(),
  category: z
    .enum(
      [
        "Conference",
        "Popularization of Science",
        "Group Photos",
        "Trips",
        "Achievements",
        "Science",
        "Others",
      ],
      { message: "Invalid category" },
    )
    .optional(),
  date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .optional(),
  tags: z.array(z.string()).optional(),
});

export const idImageSchema = z.object({
  id: z.string().uuid("Invalid image ID format"),
});
