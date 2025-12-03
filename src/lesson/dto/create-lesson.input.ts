import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateLessonInput {
  @Field()
  title: string;

  @Field(() => Int)
  courseId: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  content: string;
}
