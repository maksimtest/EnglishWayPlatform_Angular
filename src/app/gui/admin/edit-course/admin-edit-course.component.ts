import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';
import {
  InnerGeneralErrorBlockComponent
} from '../../layouts/inner-general-error-block/inner-general-error-block.component';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {NgForOf, NgIf} from '@angular/common';
import {EditingButtonsBlockComponent} from '../../layouts/editing-buttons-block/editing-buttons-block.component';
import {ApiService} from '../../../services/api.service';
import {LevelsService} from '../../../services/levels.service';
import {UnitsListComponent} from '../../layouts/units-list/units-list.component';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [
    InnerGeneralErrorBlockComponent,
    InnerHeaderComponent,
    NgIf,
    NgForOf,
    EditingButtonsBlockComponent,
    UnitsListComponent
  ],
  templateUrl: './admin-edit-course.component.html',
  styleUrl: './admin-edit-course.component.css'
})
export class AdminEditCourseComponent {
  courseId: number = 0;
  // editingLineId: number = 0;
  // editingLineIndex:number = -1;
  // generalErrorText: string = "";
  // course: CourseDto | undefined;
  // levels: string[] = [];
  // lessons: LessonDto[] = [];
  // courseEditingMode: boolean = false;
  // course_img: string = "/images/default-course.png";

  constructor(private activatedRoute: ActivatedRoute,
              private stringUtil: StringUtilService,
              private apiService: ApiService,
              private router: Router,
              private levelsService: LevelsService) {
    this.initParam();
  }

  initParam() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.courseId = this.stringUtil.convertStringToNumber(params.get('id'), 0);
      console.log("Редактируем курс с ID:", this.courseId);
    });
  }
}
