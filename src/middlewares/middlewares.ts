import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized user, Please login first",
      });

      return;
    }

    const jwtPayload = (await jwt.verify(
      token,
      process.env.JWT_SECRET!
    )) as JwtPayload;

    if (!jwtPayload) {
      res.status(400).json({
        success: false,
        message: "Invalid Token",
      });

      return;
    }

    req.user = {
      Id: jwtPayload.Id,
      Email: jwtPayload.Email,
      UserType: jwtPayload.UserType,
    };

    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error while authenticating user",
    });

    return;
  }
}

export async function isApplicant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "User not Authorized, Login first",
    });

    return;
  }

  if (req.user.UserType !== "Applicant") {
    res.status(403).json({
      success: false,
      message: "Applicant only route",
    });

    return;
  }

  next();
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "User not Authorized, Login first",
    });

    return;
  }

  if (req.user.UserType !== "Admin") {
    res.status(403).json({
      success: false,
      message: "Admin only route",
    });

    return;
  }

  next();
}
