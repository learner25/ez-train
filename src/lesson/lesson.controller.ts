import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  create(@Body() data: CreateLessonInput) {
    return this.lessonService.createLesson(data);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.lessonService.getLessonById(Number(id));
  }

  @Get('course/:courseId')
  getByCourse(@Param('courseId') courseId: string) {
    return this.lessonService.getLessonsByCourse(Number(courseId));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateLessonInput) {
    return this.lessonService.updateLesson(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.deleteLesson(Number(id));
  }
}
