import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Headers
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('lessons')
@UseGuards(AuthGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
  @Get()
  getCourses(@Headers('x-session-token') token: string) {
    return this.lessonService.getAllLessons();
  }
  @Post()
  create(
    @Body() data: CreateLessonInput,
    @Headers('x-session-token') token: string,
  ) {
    return this.lessonService.createLesson(data);
  }

  @Get(':id')
  getOne(@Param('id') id: string, @Headers('x-session-token') token: string,) {
    return this.lessonService.getLessonById(Number(id));
  }

  @Get('course/:courseId')
  getByCourse(
    @Param('courseId') courseId: string,
    @Headers('x-session-token') token: string,
  ) {
    return this.lessonService.getLessonsByCourse(Number(courseId));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateLessonInput,
    @Headers('x-session-token') token: string,
  ) {
    return this.lessonService.updateLesson(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-session-token') token: string,) {
    return this.lessonService.deleteLesson(Number(id));
  }
}
