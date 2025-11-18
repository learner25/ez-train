import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Lesson } from './lesson.model';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './dto/create-lesson.input';
import { UpdateLessonInput } from './dto/update-lesson.input';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => Lesson)
  lesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.getLessonById(id);
  }

  @Query(() => [Lesson])
  lessonsByCourse(@Args('courseId', { type: () => Int }) courseId: number) {
    return this.lessonService.getLessonsByCourse(courseId);
  }

  @Mutation(() => Lesson)
  createLesson(@Args('data') data: CreateLessonInput) {
    return this.lessonService.createLesson(data);
  }

  @Mutation(() => Lesson)
  updateLesson(@Args('data') data: UpdateLessonInput) {
    return this.lessonService.updateLesson(data.id, data);
  }

  @Mutation(() => Lesson)
  deleteLesson(@Args('id', { type: () => Int }) id: number) {
    return this.lessonService.deleteLesson(id);
  }
}
