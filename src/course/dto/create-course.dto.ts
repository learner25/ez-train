import { IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  description?: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  level?: string;
}
