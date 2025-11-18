import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Quiz } from '../quiz/quiz.model';
import { GraphQLJSON } from 'graphql-type-json';

@ObjectType()
export class Lesson {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLJSON)
  content: any;

  @Field(() => [Quiz])
  quizzes: Quiz[];
}
