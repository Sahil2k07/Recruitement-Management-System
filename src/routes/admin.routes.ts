import { Router } from "express";
import AdminQueries from "../queries/admin.queries";
import { prisma } from "../config/prisma";
import AdminService from "../services/admin.services";
import AdminController from "../controllers/admin.controller";
import { auth, isAdmin } from "../middlewares/middlewares";

const adminQueries = new AdminQueries(prisma);
const adminService = new AdminService(adminQueries);
const adminController = new AdminController(adminService);

const adminRouter = Router();

adminRouter.post("/admin/job", auth, isAdmin, async (req, res) => {
  await adminController.createJob(req, res);
});

adminRouter.get("/admin/job/:job_id", auth, isAdmin, async (req, res) => {
  await adminController.getJobInfo(req, res);
});

adminRouter.get("/admin/applicants", auth, isAdmin, async (req, res) => {
  await adminController.getAllApplicants(req, res);
});

adminRouter.get(
  "/admin/applicant/:applicant_id",
  auth,
  isAdmin,
  async (req, res) => {
    await adminController.getApplicantData(req, res);
  }
);

export default adminRouter;
