import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { TakeQuizDto } from './dto/take-quiz.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(':quizId/take/:userId')
  async takeQuiz(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Param('userId') userId: string,
    @Body() dto: TakeQuizDto,
  ) {
    // Calculate score first
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { correctCount, totalQuestions } =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await this.quizService.calculateScore(quizId, dto.answers);

    const score = Math.round((correctCount / totalQuestions) * 100);

    // Controller decides pass/fail using 70% threshold
    const passed = score >= 70;

    // Save result
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const result = await this.quizService.saveQuizResult(
      userId,
      quizId,
      score,
      passed,
    );

    // Update lesson progress
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.quizService.updateLessonProgress(userId, quizId);

    return {
      message: 'Quiz completed',
      score,
      passed,
      result,
    };
  }
}
