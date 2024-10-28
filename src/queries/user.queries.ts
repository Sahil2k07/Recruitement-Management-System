import type { PrismaClient } from "@prisma/client";

class UserQueries {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async existingUser(Email: string) {
    return await this.prisma.user.findFirst({ where: { Email } });
  }

  async newUser(
    Name: string,
    Email: string,
    UserType: "Applicant" | "Admin",
    Address: string,
    ProfileHeadline: string,
    Password: string
  ) {
    return await this.prisma.user.create({
      data: {
        Email,
        Password,
        UserType,
        ProfileHeadline,
        Address,
        Profile: {
          create: {
            Name,
            Email,
            Phone: "N/A",
          },
        },
      },
    });
  }
}

export default UserQueries;
