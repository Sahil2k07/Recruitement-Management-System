import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized user, Please login first",
    });
  }

  const jwtPayload = (await jwt.verify(
    token,
    process.env.JWT_SECRET!
  )) as JwtPayload;

  if (!jwtPayload) {
    return res.status(400).json({
      success: false,
      message: "Invalid Token",
    });
  }

  req.user = {
    Id: jwtPayload.Id,
    Email: jwtPayload.Email,
    UserType: jwtPayload.UserType,
  };

  next();
}

export async function isApplicant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not Authorized, Login first",
    });
  }

  if (req.user.UserType !== "Applicant") {
    return res.status(403).json({
      success: false,
      message: "Applicant only route",
    });
  }

  next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "User not Authorized, Login first",
    });
  }

  if (req.user.UserType !== "Admin") {
    return res.status(403).json({
      success: false,
      message: "Admin only route",
    });
  }

  next();
}
