import z from "zod";

export const createJobSchema = z.object({
  Title: z.string().trim(),
  Description: z.string().trim(),
  CompanyName: z.string().trim(),
});
