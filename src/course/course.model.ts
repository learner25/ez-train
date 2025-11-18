import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Lesson } from '../lesson/lesson.model';

@ObjectType()
export class Course {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  level?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Field(() => [Lesson])
  lessons: Lesson[];
}
