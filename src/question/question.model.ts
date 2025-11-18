import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => ID)
  id: string;

  @Field()
  questionText: string;

  @Field()
  optionA: string;

  @Field()
  optionB: string;

  @Field()
  optionC: string;

  @Field()
  optionD: string;

  @Field()
  correctAnswer: string;
}
