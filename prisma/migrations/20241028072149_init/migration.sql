-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Applicant', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Address" TEXT,
    "UserType" "UserType" NOT NULL,
    "Password" TEXT NOT NULL,
    "ProfileHeadline" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "Id" TEXT NOT NULL,
    "ApplicantId" TEXT NOT NULL,
    "ResumeFileAddress" TEXT,
    "Skills" TEXT,
    "Education" TEXT,
    "Experience" TEXT,
    "Name" TEXT,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Job" (
    "Id" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "PostedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalApplicant" INTEGER NOT NULL,
    "CompanyName" TEXT NOT NULL,
    "PostedById" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_ApplicantId_key" ON "Profile"("ApplicantId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_Email_key" ON "Profile"("Email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_ApplicantId_fkey" FOREIGN KEY ("ApplicantId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_PostedById_fkey" FOREIGN KEY ("PostedById") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
