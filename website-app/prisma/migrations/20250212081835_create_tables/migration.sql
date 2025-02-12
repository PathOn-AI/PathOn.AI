/*
  Warnings:

  - The `status` column on the `updates_subscribers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('subscribed', 'unsubscribed');

-- AlterTable
ALTER TABLE "updates_subscribers" DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'subscribed';
