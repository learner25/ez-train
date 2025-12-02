import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { Course } from './course.model';

@ObjectType()
export class Enrollment {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

  @Field(() => Int)
  courseId: number;

  @Field()
  enrolledAt: Date;

  @Field(() => User)
  user: User;

  @Field(() => Course)
  course: Course;
}
