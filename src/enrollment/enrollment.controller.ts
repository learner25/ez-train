import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollDto } from './dto/enroll.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'; 

@Controller('enrollments')
@UseGuards(AuthGuard)
export class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  // Enroll authenticated user
  @Post()
  enrollUser(@Body() body: Omit<EnrollDto, 'userId'>, @CurrentUser() user) {
    console.log('Enrolling user:', user);
    return this.enrollmentService.enroll({ ...body, userId: user.id });
  }

  // Get authenticated user's enrollments
  @Get()
  getEnrollments(@CurrentUser() user) {
    // always return enrollments of the logged-in user
    return this.enrollmentService.getUserEnrollments(user.id);
  }
}
