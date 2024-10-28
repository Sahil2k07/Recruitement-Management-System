import type { NextFunction, Request, Response } from "express";

export function auth(req: Request, res: Response, next: NextFunction) {
  next();
}

export function isApplicant(req: Request, res: Response, next: NextFunction) {
  next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  next();
}
