/*
  Warnings:

  - A unique constraint covering the columns `[surName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_surName_key" ON "User"("surName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
