/*
  Warnings:

  - Added the required column `contactName` to the `PartnerAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartnerAccount" ADD COLUMN     "contactName" TEXT NOT NULL;
