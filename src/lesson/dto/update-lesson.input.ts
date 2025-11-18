import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateLessonInput } from './create-lesson.input';

@InputType()
export class UpdateLessonInput extends PartialType(CreateLessonInput) {
  @Field(() => Int)
  id: number;
}
