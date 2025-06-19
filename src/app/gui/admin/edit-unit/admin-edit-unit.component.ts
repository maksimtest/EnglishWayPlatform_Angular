import {Component, OnInit} from '@angular/core';
import {MenuContentComponent} from '../../contents/menu-content/menu-content.component';
import {ActivatedRoute} from '@angular/router';
import {StringUtilService} from '../../../services/string-util.service';
import {TeacherInfoComponent} from '../../contents/teacher-info/teacher-info.component';
import {YoutubeVideoComponent} from '../../contents/youtube-video/youtube-video.component';
import {NgForOf, NgIf} from '@angular/common';
import {
  InnerGeneralErrorBlockComponent
} from '../../layouts/inner-general-error-block/inner-general-error-block.component';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {EditingButtonsBlockComponent} from '../../layouts/editing-buttons-block/editing-buttons-block.component';
import {TestsComponent} from '../../contents/tests/tests.component';
import {ContentListComponent} from '../../layouts/content-list/content-list.component';

@Component({
  selector: 'app-edit-unit',
  standalone: true,
  imports: [
    MenuContentComponent,
    TeacherInfoComponent,
    YoutubeVideoComponent,
    NgIf,
    InnerGeneralErrorBlockComponent,
    InnerHeaderComponent,
    NgForOf,
    EditingButtonsBlockComponent,
    TestsComponent,
    ContentListComponent
  ],
  templateUrl: './admin-edit-unit.component.html',
  styleUrl: './admin-edit-unit.component.css'
})
export class AdminEditUnitComponent implements OnInit {
  lessonId: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private stringUtil: StringUtilService) {
  }

  ngOnInit() {
    this.initParam()
  }

  initParam() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.lessonId = this.stringUtil.convertStringToNumber(params.get('id'), 0);
    });
  }
}
