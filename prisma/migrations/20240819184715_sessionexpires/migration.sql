/*
  Warnings:

  - You are about to drop the column `sessionNum` on the `Task` table. All the data in the column will be lost.
  - Added the required column `sessionExpires` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "sessionNum",
ADD COLUMN     "sessionExpires" TEXT NOT NULL;
