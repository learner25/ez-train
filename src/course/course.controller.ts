import { Controller, Get,Post,Body,Patch,Delete, Param, ParseIntPipe, UseGuards, Headers } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('courses')

@UseGuards(AuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Get all courses
  @Get()
 
  //@ApiBearerAuth()
  async getCourses() {
    return this.courseService.getAllCourses();
  }

  // Get a single course by ID
  @Get(':id')
   
  async getCourseById(@Param('id', ParseIntPipe) id: number ) {
    return this.courseService.getCourseById(id);
  }
  @Post()
  async createCourse(@Body() createCourseInput: CreateCourseInput){
    return this.courseService.create(createCourseInput);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseInput: UpdateCourseInput,
   
) {
  return this.courseService.update(id, updateCourseInput);
}
 @Delete(':id')
  async deleteCourse(@Param('id', ParseIntPipe) id: number,) {
    return this.courseService.delete(id);
  }
}
