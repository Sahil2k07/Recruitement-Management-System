import UserQueries from "../queries/user.queries";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  ) {
    const existingUser = await this.userQueries.existingUser(Email);

    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(
      Password,
      Number(process.env.BCRYPT_ROUNDS)!
    );

    const newUser = await this.userQueries.newUser(
      Name,
      Email,
      UserType,
      Address,
      ProfileHeadline,
      hashedPassword
    );

    return newUser;
  }

  async login(Email: string, Password: string) {
    const user = await this.userQueries.existingUser(Email);

    if (!user) throw new Error("User not Found");

    if (!(await bcrypt.compare(Password, user.Password)))
      throw new Error("Wrong Password");

    const jwtPayload = {
      Id: user.Id,
      Email: user.Email,
      UserType: user.UserType,
    };

    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    return {
      token,
      data: jwtPayload,
    };
  }

  async uploadResume() {}
}

export default UserService;
