import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  private defaultInclude = {
    lessons: {
      include: {
        quizzes: {
          include: {
            questions: true,
          },
        },
      },
    },
  };

 
  create(data: CreateCourseInput) {
    return this.prisma.course.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data,
      include: this.defaultInclude,
    });
  }

  
  async getAllCourses() {
    return this.prisma.course.findMany({
      include: this.defaultInclude,
    });
  }

 
  async getCourseById(courseId: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: this.defaultInclude,
    });

    if (!course) {
      throw new NotFoundException(`Course with id ${courseId} not found`);
    }

    return course;
  }

 

  async update(id: number, data: UpdateCourseInput) {
    const exists = await this.prisma.course.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Course with id ${id} not found`);

    return this.prisma.course.update({
      where: { id },
      data,
      include: this.defaultInclude,
    });
  }

 
  async remove(id: number) {
    const exists = await this.prisma.course.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException(`Course with id ${id} not found`);

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
