import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from '../graphql/models/enrollment.model'; // <-- generate or create manually
import { EnrollInput } from './dto/enroll.input';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(private enrollmentService: EnrollmentService) {}

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Mutation(() => Enrollment)
  enrollUser(@Args('input') input: EnrollInput) {
    return this.enrollmentService.enroll(input);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @Query(() => [Enrollment])
  getUserEnrollments(@Args('userId') userId: string) {
    return this.enrollmentService.getUserEnrollments(userId);
  }
}
 