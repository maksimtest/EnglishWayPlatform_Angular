import {StudentDto} from './StudentDto';
import {CourseDto} from './CourseDto';

export interface StudentsDto {
  studentsList: StudentDto[];
  coursesList: CourseDto[];
}
