import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {ActivitiesListDto} from '../../../interfaces/ActivitiesListDto';
import {StudentDto} from '../../../interfaces/StudentDto';
import {NgForOf, NgIf} from '@angular/common';
import {CourseDto} from '../../../interfaces/CourseDto';
import {LevelsService} from '../../../services/levels.service';
import {StudentActivityDto} from '../../../interfaces/StudentActivityDto';
import {StringUtilService} from '../../../services/string-util.service';
import {UserDto} from '../../../interfaces/UserDto';

@Component({
  selector: 'app-admin-activities',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-activities.component.html',
  styleUrl: './admin-activities.component.css'
})
export class AdminActivitiesComponent implements OnInit {
  studentsList: StudentDto[] = [];
  teachersList: UserDto[] = [];
  courses: CourseDto[] = [];

  //List<StudentDto> studentsList
  //     private UserDto user;
  //private Long id;
  //private String name;
  //private String email;
//StudentActivityDto
  //     private List<StudentActivityDto> studentActivities = new ArrayList<>();
  constructor(private apiService: ApiService,
              private levelsService: LevelsService,
              private stringUtil: StringUtilService) {
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.apiService.adminGetStudentActivity().subscribe({
      next: value => {
        let studentsDto: ActivitiesListDto = value;
        this.studentsList = studentsDto.studentsList;
        this.teachersList = studentsDto.teachersList;
        this.courses = studentsDto.coursesList;
      },
      error: error => {
        console.log('admin-activities: initData, error=' + JSON.stringify(error));
      }
    })
  }

  createActivity(userId: number) {
    let newTeacherEl = document.getElementById('admin-student-new-teacher-' + userId) as HTMLSelectElement;
    let teacherId = newTeacherEl.value;

    let newCourseEl = document.getElementById('admin-student-new-course-' + userId) as HTMLSelectElement;
    let courseId = newCourseEl.value;
    let studentActivity = this.getEmptyStudentActivity();
    studentActivity.teacherId = this.stringUtil.convertStringToNumber(teacherId, 0);
    studentActivity.studentId = userId;
    studentActivity.courseId = this.stringUtil.convertStringToNumber(courseId, 0);
    console.log('createActivity, studentActivity=' + JSON.stringify(studentActivity));
    this.apiService.adminCreateStudentActivity(studentActivity).subscribe({
      next: value => {
        let studentDto: StudentDto = value;
        this.updateStudentActivity(studentDto);
      }, error: error => {
        console.log("adminStudent,create, error=" + JSON.stringify(error));
      }
    })
  }

  updateStudentActivity(studentDto: StudentDto) {
    for (let i = 0; i < this.studentsList.length; i++) {
      if (this.studentsList[i].user.id == studentDto.user.id) {
        this.studentsList[i] = studentDto;
        return;
      }
    }
  }

  levelMoreThanSecond(levelCode1: string, levelCode2: string): boolean {
    return this.levelsService.getLevelCode(levelCode1) <= this.levelsService.getLevelCode(levelCode2);
  }

  getEmptyStudentActivity(): StudentActivityDto {
    return {id:0, studentId: 0, teacherId: 0,courseId: 0, courseName:'', courseUnitCode:'', paymentSumma: 0, paymentDate: '', paymentCount: 0, activeNumber: 0};
  }
}
