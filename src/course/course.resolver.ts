import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './course.model';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.dto';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Query(() => [Course])
  getAllCourses() {
    return this.service.getAllCourses();
  }

  @Query(() => Course)
  getCourseById(@Args('id', { type: () => Int }) id: number) {
    return this.service.getCourseById(id);
  }

  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.service.create(data);
  }

  @Mutation(() => Course)
  updateCourse(@Args('data') data: UpdateCourseInput) {
    return this.service.update(data.id, data);
  }

  @Mutation(() => Boolean)
  deleteCourse(@Args('id', { type: () => Int }) id: number) {
    return this.service.delete(id).then(() => true);
  }
}
