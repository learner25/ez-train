import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  Req,
  Headers
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { TakeQuizDto } from './dto/take-quiz.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('quizzes')
@UseGuards(AuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(':quizId/take')
  async takeQuiz(
    @Param('quizId', ParseIntPipe) quizId: number,
    @Body() dto: TakeQuizDto,
    @Req() req,
     @Headers('x-session-token') token: string,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.id;
    console.log(req)
    const { correctCount, totalQuestions } =
      await this.quizService.calculateScore(quizId, dto.answers);

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 70;

    const result = await this.quizService.saveQuizResult(
      userId,
      quizId,
      score,
      passed,
    );

    await this.quizService.updateLessonProgress(userId, quizId);

    return {
      message: 'Quiz completed',
      score,
      passed,
      result,
    };
  }
}
