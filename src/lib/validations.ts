import { z } from "zod";

export const petFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  ownerName: z.string().trim().min(1, "Owner name is required").max(100),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image url must be a valid url" }),
  ]),
  age: z.coerce
    .number()
    .int()
    .positive({ message: "Age must be a positive number" }),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
