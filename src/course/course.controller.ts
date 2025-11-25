import { Controller, Get,Post,Body, Param, ParseIntPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseInput, UpdateCourseInput } from './dto/course.dto';
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  // Get all courses
  @Get()
  async getCourses() {
    return this.courseService.getAllCourses();
  }

  // Get a single course by ID
  @Get(':id')
  async getCourseById(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getCourseById(id);
  }
  @Post()
  async createCourse(@Body() createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput);
  }

}
