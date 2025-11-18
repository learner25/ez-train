import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  level?: string;
}

@InputType()
export class UpdateCourseInput extends PartialType(CreateCourseInput) {
  @Field(() => Int)
  id: number;
}
