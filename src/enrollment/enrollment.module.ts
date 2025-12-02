import { Module } from '@nestjs/common';
import { EnrollmentResolver } from './enrollment.resolver';
import { EnrollmentService } from './enrollment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [EnrollmentResolver, EnrollmentService, PrismaService],
})
export class EnrollmentModule {}
