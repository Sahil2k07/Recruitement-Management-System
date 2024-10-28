import { Router } from "express";
import { prisma } from "../config/prisma";
import JobController from "../controllers/job.controller";
import JobQueries from "../queries/job.queries";
import JobService from "../services/job.services";
import { auth, isApplicant } from "../middlewares/middlewares";

const jobQueries = new JobQueries(prisma);
const jobService = new JobService(jobQueries);
const jobController = new JobController(jobService);

const jobRouter = Router();

jobRouter.get("/jobs", auth, async (req, res) => {
  await jobController.getJobs(req, res);
});

jobRouter.get("/jobs/apply", auth, isApplicant, async (req, res) => {
  await jobController.applyJob(req, res);
});

export default jobRouter;
