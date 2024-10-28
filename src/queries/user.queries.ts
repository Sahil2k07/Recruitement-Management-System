import type { PrismaClient } from "@prisma/client";

class UserQueries {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}

export default UserQueries;
