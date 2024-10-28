import type { PrismaClient } from "@prisma/client";

class AdminQueries {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}

export default AdminQueries;
