import type { Request, Response } from "express";
import UserService from "../services/user.services";
import z from "zod";
import { loginSchema, signupSchema } from "../dto/user.dto";

interface UserRoutes {
  signup: (req: Request, res: Response) => Promise<Response>;
  login: (req: Request, res: Response) => Promise<Response>;
  uploadResume: (req: Request, res: Response) => Promise<Response>;
}

class UserController implements UserRoutes {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async signup(req: Request, res: Response) {
    try {
      const { Name, Email, Password, UserType, Address, ProfileHeadline } =
        signupSchema.parse(req.body);

      const data = await this.userService.signup(
        Name,
        Email,
        Password,
        UserType,
        Address,
        ProfileHeadline
      );

      return res.status(201).json({
        success: true,
        message: "Signup successfull",
        data,
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: e.errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong while signup",
        error: e instanceof Error ? e.message : "Some Anonymous Error",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { Email, Password } = loginSchema.parse(req.body);

      const data = await this.userService.login(Email, Password);

      return res.status(200).json({
        success: true,
        message: "Login successfull",
        data,
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: e.errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Something went wrong while login",
        error: e instanceof Error ? e.message : "Some Anonymous Error",
      });
    }
  }

  async uploadResume(req: Request, res: Response) {
    try {
      const data = await this.userService.uploadResume();

      return res.status(200).json({
        success: true,
        message: "Uploaded Resume successfully",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while uploading resume",
        error: e instanceof Error ? e.message : "Some Anonymous Error",
      });
    }
  }
}

export default UserController;
