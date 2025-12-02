import { IsString, IsInt } from 'class-validator';

export class EnrollDto {
  @IsString()
  userId: string;

  @IsInt()
  courseId: number;
}
