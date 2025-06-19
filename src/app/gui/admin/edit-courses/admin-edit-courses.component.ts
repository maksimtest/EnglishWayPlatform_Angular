import {Component} from '@angular/core';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {
  InnerGeneralErrorBlockComponent
} from '../../layouts/inner-general-error-block/inner-general-error-block.component';
import {NgForOf, NgIf} from '@angular/common';
import {LevelsService} from '../../../services/levels.service';
import {ApiService} from '../../../services/api.service';
import {CourseDto} from '../../../interfaces/CourseDto';
import {ModalComponent} from '../../dialog/modal/modal.component';
import {Router} from '@angular/router';
import {CoursesListComponent} from '../../layouts/courses-list/courses-list.component';

@Component({
  selector: 'app-edit-courses',
  standalone: true,
  imports: [
    InnerHeaderComponent,
    InnerGeneralErrorBlockComponent,
    NgIf,
    NgForOf,
    ModalComponent,
    CoursesListComponent
  ],
  templateUrl: './admin-edit-courses.component.html',
  styleUrl: './admin-edit-courses.component.css'
})
export class AdminEditCoursesComponent {
  // generalErrorText: string = "";
  // levels: string[]=[];
  // codeLevels: string[] = [];
  // coursesDto: CourseDto[] = [];
  // courses: CourseDto[] = [];
  // levelFilters: string[] = [];
  // defaultCourseImg: string="/images/default-course.png";
  // newCourseDialogVisible: boolean = false;

  constructor(private apiService: ApiService,
              private levelsService: LevelsService,
              private router: Router) {
    // this.levels = levelsService.getLevels();
    // this.codeLevels = levelsService.getCodeLevels();
//    this.initData();
  }
  // initData(){
  //   this.apiService.adminCourse('get', null).subscribe(
  //     {
  //       next: value => {
  //         this.coursesDto = value;
  //         this.updatePage();
  //       },
  //       error: error => {
  //         console.log('getCourse. error: ' + JSON.stringify(error));
  //       }
  //     }
  //   )
  // }
  // updateFilters(){
  //   this.levelFilters = [];
  //   for(let code of this.codeLevels){
  //     let checkElement = document.getElementById('level-'+code) as HTMLInputElement;
  //     console.log('checkElement='+checkElement);
  //     if(checkElement.checked){
  //       this.levelFilters.push(code);
  //     }
  //   }
  // }
  // updatePage(){
  //   this.updateFilters();
  //   if(this.levelFilters.length == 0){
  //     this.courses = this.coursesDto;
  //   } else {
  //     this.courses = this.coursesDto.filter(course => this.levelFilters.includes(course.codeLevel));
  //   }
  // }
  // create(){
  //   this.newCourseDialogVisible = true;
  //   // todo: 1 open dialog with nameOfCourse + level
  //   //this.apiService.adminCourse('create', undefined).subscribe()
  // }
  // createCourse(){
  //   let nameElement = document.getElementById('newCourseName') as HTMLInputElement;
  //   let levelElement = document.getElementById('newCourseLevel') as HTMLSelectElement;
  //   let name = nameElement.value;
  //   let level = levelElement.value;
  //   console.log('createCourse, name='+name+', level='+level);
  //   let course: CourseDto = {id:0,name:name,level:level, codeLevel:'', img:'', complication:'',lessons:[]};
  //   this.apiService.adminCourse('create', course).subscribe({
  //     next: value => {
  //       this.coursesDto = value;
  //       this.updatePage();
  //       this.newCourseDialogVisible = false;
  //     },
  //     error: error => {
  //       console.log('createCourse, error: ' + JSON.stringify(error));
  //     }
  //   })
  // }
  // goToCourseEditingPage(idNum:number){
  //   let id = ''+idNum;
  //   this.router.navigate(['/admin/edit-course/', id]);
  // }
}
