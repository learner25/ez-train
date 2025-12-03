import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { Quiz } from './quiz/quiz.model';
import { QuizModule } from './quiz/quiz.module';
import { LessonModule } from './lesson/lesson.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule, // 👈 REQUIRED
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    CourseModule,
    EnrollmentModule,
    QuizModule,
    LessonModule,
    AuthModule,
  ],
})
export class AppModule {}
