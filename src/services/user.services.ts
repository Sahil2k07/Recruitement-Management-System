import UserQueries from "../queries/user.queries";

class UserService {
  private userQueries: UserQueries;

  constructor(userQueries: UserQueries) {
    this.userQueries = userQueries;
  }

  async signup(
    Name: string,
    Email: string,
    Password: string,
    UserType: "Applicant" | "Admin",
    Address: string,
    ProfileHeadline: string
  ) {}

  async login(Email: string, Password: string) {}

  async uploadResume() {}
}

export default UserService;
