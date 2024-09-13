-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST');

-- CreateTable
CREATE TABLE "userRoles" (
    "clerkId" TEXT NOT NULL,
    "role" "Role" NOT NULL
);

-- CreateTable
CREATE TABLE "PartnerAccount" (
    "partnerAccountId" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerAccount_pkey" PRIMARY KEY ("partnerAccountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userRoles_clerkId_key" ON "userRoles"("clerkId");

-- CreateIndex
CREATE INDEX "userRoles_clerkId_role_idx" ON "userRoles"("clerkId", "role");
