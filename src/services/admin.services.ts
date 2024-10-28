import AdminQueries from "../queries/admin.queries";

class AdminService {
  private adminQueries: AdminQueries;

  constructor(adminQueries: AdminQueries) {
    this.adminQueries = adminQueries;
  }

  async createJob(Title: string, Description: string, CompanyName: string) {}

  async getJobInfo(job_id: string) {}

  async getAllUsers() {}

  async getApplicantData(applicant_id: string) {}
}

export default AdminService;
