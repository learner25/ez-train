import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async calculateScore(
    quizId: number,
    answers: { questionId: number; selected: string }[],
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true, lesson: true },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;

    for (const q of quiz.questions) {
      const userAnswer = answers.find(a => a.questionId === q.id);
      if (!userAnswer) continue;

      if (userAnswer.selected.toUpperCase() === q.correctAnswer.toUpperCase()) {
        correctCount++;
      }
    }

    return { correctCount, totalQuestions };
  }

  async saveQuizResult(
    userId: string,
    quizId: number,
    score: number,
    passed: boolean,
  ) {
    return this.prisma.quizResult.create({
      data: { userId, quizId, score, passed },
    });
  }

  async updateLessonProgress(userId: string, quizId: number) {
    // Find lesson
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { lesson: { include: { quizzes: true } } },
    });
    if (!quiz) return;

    const lessonId = quiz.lesson.id;
    const totalQuizzes = quiz.lesson.quizzes.length;

    // Count passed quizzes
    const passedQuizzes = await this.prisma.quizResult.count({
      where: { userId, passed: true, quiz: { lessonId } },
    });

    const progressPct = (passedQuizzes / totalQuizzes) * 100;

    await this.prisma.userLessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {
        progressPct,
        completed: progressPct === 100,
        completedAt: progressPct === 100 ? new Date() : null,
      },
      create: {
        userId,
        lessonId,
        progressPct,
        completed: progressPct === 100,
        completedAt: progressPct === 100 ? new Date() : null,
      },
    });
  }
}
