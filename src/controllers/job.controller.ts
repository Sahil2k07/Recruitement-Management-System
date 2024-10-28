import type { Request, Response } from "express";
import JobService from "../services/job.services";

interface JobRoutes {
  getJobs: (req: Request, res: Response) => Promise<Response>;
  applyJob: (req: Request, res: Response) => Promise<Response>;
}

class JobController implements JobRoutes {
  private jobService: JobService;

  constructor(jobService: JobService) {
    this.jobService = jobService;
  }

  async getJobs(req: Request, res: Response) {
    try {
      const data = await this.jobService.getJobs();

      return res.status(200).json({
        success: true,
        message: "Fetched all jobs successfully",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server error while getting-jobs",
        error: e instanceof Error ? e.message : "Anonymous Error",
      });
    }
  }

  async applyJob(req: Request, res: Response) {
    try {
      const job_id = req.query.job_id;

      const data = await this.jobService.applyJobs(String(job_id));

      return res.status(200).json({
        success: true,
        message: "Successfully applied for the job",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "Server error while applying for job",
        error: e instanceof Error ? e.message : "Anonymours Error",
      });
    }
  }
}

export default JobController;
