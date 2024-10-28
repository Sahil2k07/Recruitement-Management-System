import type { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        Email: string;
        Id: string;
        UserType: "Applicant" | "Admin";
      };
      files: {
        Resume: File;
      };
    }
  }
}
