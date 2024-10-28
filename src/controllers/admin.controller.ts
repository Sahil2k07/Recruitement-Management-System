import type { Request, Response } from "express";
import AdminService from "../services/admin.services";
import { createJobSchema } from "../dto/admin.dto";
import z from "zod";

interface AdminRoutes {
  createJob: (req: Request, res: Response) => Promise<Response>;
  getJobInfo: (req: Request, res: Response) => Promise<Response>;
  getAllApplicants: (req: Request, res: Response) => Promise<Response>;
  getApplicantData: (req: Request, res: Response) => Promise<Response>;
}

class AdminController implements AdminRoutes {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  async createJob(req: Request, res: Response) {
    try {
      const { Title, Description, CompanyName } = createJobSchema.parse(
        req.body
      );

      const data = await this.adminService.createJob(
        Title,
        Description,
        CompanyName
      );

      return res.status(201).json({
        success: true,
        message: "Created Job Post Successfully",
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
        message: "Server error while creating job post",
        error: e instanceof Error ? e.message : "Anonymous Error",
      });
    }
  }

  async getJobInfo(req: Request, res: Response) {
    try {
      const job_id = req.params.job_id;

      const data = await this.adminService.getJobInfo(String(job_id));

      return res.status(200).json({
        success: true,
        message: "Fetched Job Details successfully",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server error while fetching details of the jobPost",
        error: e instanceof Error ? e.message : "Anonymous Error",
      });
    }
  }

  async getAllApplicants(req: Request, res: Response) {
    try {
      const data = await this.adminService.getAllUsers();

      return res.status(200).json({
        success: true,
        message: "Fetched all users successfully",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server error while Fetching all applicants",
        error: e instanceof Error ? e.message : "Anonymous Error",
      });
    }
  }

  async getApplicantData(req: Request, res: Response) {
    try {
      const { applicant_id } = req.params;

      const data = await this.adminService.getApplicantData(
        String(applicant_id)
      );

      return res.status(200).json({
        success: true,
        message: "Fetched applicant data successfully",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server error while Fetching applicant data",
        error: e instanceof Error ? e.message : "Anonymous Error",
      });
    }
  }
}

export default AdminController;
