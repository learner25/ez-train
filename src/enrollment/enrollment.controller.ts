import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
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
  enrollUser(
    @Body() data: EnrollDto,
    @CurrentUser() user,
    @Headers('x-session-token') token: string,
  ) {
    // always enroll the logged-in user
    console.log('Enrolling user:', user);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return this.enrollmentService.enroll(data);
  }

  // Get authenticated user's enrollments
  @Get()
  getEnrollments(@CurrentUser() user,
    @Headers('x-session-token') token: string,
  ) {
    // always return enrollments of the logged-in user
    return this.enrollmentService.getUserEnrollments(user.id);
  }
}
