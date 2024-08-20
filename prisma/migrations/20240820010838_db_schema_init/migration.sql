-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GUEST');

-- CreateTable
CREATE TABLE "userRoles" (
    "clerkId" TEXT NOT NULL,
    "role" "Role" NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "contactId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerAccount" (
    "partnerAccountId" SERIAL NOT NULL,
    "accountName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerAccount_pkey" PRIMARY KEY ("partnerAccountId")
);

-- CreateTable
CREATE TABLE "Contact" (
    "contactId" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userRoles_clerkId_key" ON "userRoles"("clerkId");

-- CreateIndex
CREATE INDEX "userRoles_clerkId_role_idx" ON "userRoles"("clerkId", "role");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("contactId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "PartnerAccount"("partnerAccountId") ON DELETE CASCADE ON UPDATE CASCADE;
