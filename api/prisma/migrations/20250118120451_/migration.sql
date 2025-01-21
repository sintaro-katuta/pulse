/*
  Warnings:

  - The `priority` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('Low', 'Medium', 'High', 'Critical');

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "priority",
ADD COLUMN     "priority" "TicketPriority" NOT NULL DEFAULT 'Low';
