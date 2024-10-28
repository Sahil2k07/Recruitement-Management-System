import type { PrismaClient } from "@prisma/client";

class JobQueries {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}

export default JobQueries;
