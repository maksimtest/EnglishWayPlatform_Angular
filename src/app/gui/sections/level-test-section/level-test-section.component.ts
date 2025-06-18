import {Component, OnInit} from '@angular/core';
import {LevelTestDto} from '../../../interfaces/LevelTestDto';
import {NgForOf, NgIf} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {QuickRegisterFormComponent} from '../../forms/quick-register-form/quick-register-form.component';
import {LevelTestMarkService} from '../../../services/level-test-mark.service';
import {StringUtilService} from '../../../services/string-util.service';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-level-test-section',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    TranslatePipe,
    QuickRegisterFormComponent,
    FormsModule
  ],
  templateUrl: './level-test-section.component.html',
  styleUrl: './level-test-section.component.css'
})
export class LevelTestSectionComponent implements OnInit {
  tests: LevelTestDto[] = [];
  finishTestAlready: boolean = false;
  selectedAnswer: number = 0;
  answersForRegister: string = "";
  currentNumber: number = 0;

  numberValue: number = 0;
  questionTextValue: string = "";
  case1TextValue: string = "";
  case2TextValue: string = "";
  case3TextValue: string = "";
  levelValue: string = "";

  constructor(private levelTestMarkService: LevelTestMarkService,
              private stringUtil: StringUtilService,
              private apiService: ApiService) {
  }
  ngOnInit() {
    this.initTests();
  }

  initPage() {
    this.levelTestMarkService.initStorage(this.tests.length);
    this.currentNumber = this.levelTestMarkService.getCurrentNumber();
    this.finishTestAlready = this.levelTestMarkService.isFinish();
    if (!this.finishTestAlready) {
      this.updateTestFields();
    }
  }

  updateTestFields() {
    console.log('updateTestFields(), this.currentNumber='+this.currentNumber);
    let currentLevelTest = this.tests[this.currentNumber-1];
    this.numberValue = currentLevelTest.num;
    this.questionTextValue = currentLevelTest.question;
    this.case1TextValue = currentLevelTest.case1;
    this.case2TextValue = currentLevelTest.case2;
    this.case3TextValue = currentLevelTest.case3;
    this.levelValue = currentLevelTest.level;
    this.selectedAnswer = this.levelTestMarkService.getAnswer(this.currentNumber);
  }

  finishTest() {
    this.levelTestMarkService.updateAnswer(this.currentNumber, this.selectedAnswer);
    this.levelTestMarkService.finish();

    this.answersForRegister = this.levelTestMarkService.getAnswersForRegister();
    this.finishTestAlready = true;
  }

  prevTest() {
    this.levelTestMarkService.updateAnswer(this.currentNumber, this.selectedAnswer);
    if(this.levelTestMarkService.updateCurrentNumber(--this.currentNumber)) {
      this.updateTestFields();
    }
  }

  nextTest() {
    this.levelTestMarkService.updateAnswer(this.currentNumber, this.selectedAnswer);
    if(this.levelTestMarkService.updateCurrentNumber(++this.currentNumber)) {
      this.updateTestFields();
    }
  }

  initTests() {
    this.apiService.getLevelTest()
      .subscribe({
        next: value => {
          console.log('level-test-section.initTests: value='+JSON.stringify(value));

          this.tests = value.map((v: any)=>this.convertLevelTest(v));
          this.initPage();
        }, error: value => {
        }
      });
  }
  convertLevelTest(json: any): LevelTestDto {
    return {
      id: json.id,
      num: json.num,
      question: json.question,
      case1:json.case1,
      case2:json.case2,
      case3:json.case3,
      correct: json.correct,
      level: json.level
    };
  }
}
