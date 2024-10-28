import JobQueries from "../queries/job.queries";

class JobService {
  private jobQueries: JobQueries;

  constructor(jobQueries: JobQueries) {
    this.jobQueries = jobQueries;
  }

  async getJobs() {}

  async applyJobs(job_id: string) {}
}

export default JobService;
