import z from "zod";

export const signupSchema = z.object({
  Name: z.string().trim(),
  Email: z.string().trim().email("Invalid Email Address"),
  Password: z.string().trim(),
  ProfileHeadline: z.string().trim(),
  Address: z.string().trim(),
  UserType: z.enum(["Applicant", "Admin"]),
});

export const loginSchema = z.object({
  Email: z.string().trim().email("Invalid Email Address"),
  Password: z.string().trim(),
});
