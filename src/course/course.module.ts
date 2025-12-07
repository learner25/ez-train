import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { CourseController } from './course.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CourseService, CourseResolver],
  controllers: [CourseController],
})
export class CourseModule {}
