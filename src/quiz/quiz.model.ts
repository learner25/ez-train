import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Question } from '../question/question.model';

@ObjectType()
export class Quiz {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  passingScore: number;

  @Field(() => [Question])
  questions: Question[];
}
