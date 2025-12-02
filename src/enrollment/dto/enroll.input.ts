import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class EnrollInput {
  @Field()
  userId: string;

  @Field(() => Int)
  courseId: number;
}
