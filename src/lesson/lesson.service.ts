import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Injectable()
export class LessonService {
  constructor(private readonly prisma: PrismaService) {}
  private defaultInclude = {
    quizzes: {
      include: {
        questions: true,
      },
    },
  };
  async getAllLessons() {
    return this.prisma.lesson.findMany({
      include: this.defaultInclude,
    });
  }

  // CREATE
  async createLesson(data: CreateLessonInput) {
    return this.prisma.lesson.create({
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
        course: { connect: { id: data.courseId } },
      },
    });
  }

  // GET ONE
  async getLessonById(id: number) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        quizzes: true,
      },
    });

    if (!lesson) throw new NotFoundException(`Lesson ${id} not found`);
    return lesson;
  }

  // GET ALL (optional with filter)
  async getLessonsByCourse(courseId: number) {
    return this.prisma.lesson.findMany({
      where: { courseId },
      include: { quizzes: true },
    });
  }

  // UPDATE
  async updateLesson(id: number, data: UpdateLessonInput) {
    const exists = await this.prisma.lesson.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Lesson ${id} not found`);

    return this.prisma.lesson.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });
  }

  // DELETE
  async deleteLesson(id: number) {
    const exists = await this.prisma.lesson.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Lesson ${id} not found`);

    return this.prisma.lesson.delete({ where: { id } });
  }
}
