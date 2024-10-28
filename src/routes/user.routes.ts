import { Router } from "express";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.services";
import UserQueries from "../queries/user.queries";
import { prisma } from "../config/prisma";
import { auth, isApplicant } from "../middlewares/middlewares";

const userQueries = new UserQueries(prisma);
const userService = new UserService(userQueries);
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  await userController.signup(req, res);
});

userRouter.post("/login", async (req, res) => {
  await userController.login(req, res);
});

userRouter.post("/uploadResume", auth, isApplicant, async (req, res) => {
  await userController.uploadResume(req, res);
});

export default userRouter;
