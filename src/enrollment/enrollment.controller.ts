import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollDto } from './dto/enroll.dto';

@Controller('enrollments')
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  @Post()
  enrollUser(@Body() body: EnrollDto) {
    return this.enrollmentService.enroll(body);
  }

  @Get(':userId')
  getEnrollments(@Param('userId') userId: string) {
    return this.enrollmentService.getUserEnrollments(userId);
  }
}
