/*
  Warnings:

  - A unique constraint covering the columns `[userId,lessonId]` on the table `UserLessonProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLessonProgress_userId_lessonId_key" ON "UserLessonProgress"("userId", "lessonId");
