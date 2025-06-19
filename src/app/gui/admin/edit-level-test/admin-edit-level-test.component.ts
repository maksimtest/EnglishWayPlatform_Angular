import {Component} from '@angular/core';
import {InnerHeaderComponent} from '../../layouts/inner-header/inner-header.component';
import {ApiService} from '../../../services/api.service';
import {LevelTestDto} from '../../../interfaces/LevelTestDto';
import {
  InnerGeneralErrorBlockComponent
} from '../../layouts/inner-general-error-block/inner-general-error-block.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditingButtonsBlockComponent} from '../../layouts/editing-buttons-block/editing-buttons-block.component';
import {LevelsService} from '../../../services/levels.service';

@Component({
  selector: 'app-edit-level-test',
  standalone: true,
  imports: [
    InnerHeaderComponent,
    InnerGeneralErrorBlockComponent,
    NgIf,
    FormsModule,
    EditingButtonsBlockComponent,
    NgForOf
  ],
  templateUrl: './admin-edit-level-test.component.html',
  styleUrl: './admin-edit-level-test.component.css'
})
export class AdminEditLevelTestComponent {
  levelTest: LevelTestDto[] = [];
  generalErrorText: string = "";
  levels: string[] = [];
  editingLineId: number = 0;
  editingLineIndex: number = -1;

  constructor(private apiService: ApiService, private levelsService: LevelsService) {
    this.levels=levelsService.getLevels();
    this.init();
  }


  init() {
    this.apiService.adminLevelTest('get', undefined)
      .subscribe({
        next: value => {
          this.levelTest = value ?? [];
          console.log('edit-level-test.next: value=' + value);
        },
        error: value => {
          console.log('error:' + JSON.stringify(value));
          if (value.status == 401) {
            this.generalErrorText = "Unauthorized";
          }
        }
      })
  }

  edit(id: number) {
    this.editingLineId = id;
  }

  changeOrderLevelTest(deltaNum: number, ind: number) {
    let test1: LevelTestDto = this.levelTest[ind];
    this.levelTest[ind] = this.levelTest[ind + deltaNum];
    this.levelTest[ind + deltaNum] = test1;
  }

  saveLevelTest(test: LevelTestDto) {
    this.apiService.adminLevelTest('update', test)
      .subscribe({
        next: value => {
          console.log('save-level-test.next: value=' + JSON.stringify(value));
          let test1 = value as LevelTestDto;
          console.log('saveLevelTest, test=1' + JSON.stringify(test1));
          // if(this.changeOrderingForTestIndex>=0){
          //   console.log('exchange!!, this.editingLineIndex'+this.editingLineIndex+
          //     ', this.changeOrderingForTestIndex='+
          //     this.changeOrderingForTestIndex);
          //
          //   let test2 = this.levelTest[this.editingLineIndex];
          //   this.levelTest[this.editingLineIndex] = this.levelTest[this.changeOrderingForTestIndex];
          //   this.levelTest[this.changeOrderingForTestIndex] = test2;
          //   if(this.changeOrderingForTestIndex < this.editingLineIndex){
          //     console.log('1111111');
          //     this.levelTest[this.editingLineIndex].num += 1;
          //   } else {
          //     console.log('2222');
          //     //this.levelTest[this.changeOrderingForTestIndex].num += 1;
          //   }
          // } else if (test1) {
          this.levelTest[this.editingLineIndex] = test1;
          // }
          this.editingLineId = 0;
          this.editingLineIndex = -1;
          // this.changeOrderingForTestIndex = -1;
        },
        error: value => {
          console.log('save-level-test.error:' + JSON.stringify(value));
          if (value.status == 401) {
            this.generalErrorText = "Unauthorized";
          }
        }
      })
  }

  save(id: number) {
    this.editingLineId = 0;
    this.editingLineIndex = this.findLevelTestIndex(id);
    let test: LevelTestDto = this.levelTest[this.editingLineIndex];
    this.editingLineId = test.id;
    console.log('change[step1] id ' + id);

    let questionElement = document.getElementById('question-' + id) as HTMLTextAreaElement;
    let case1Element = document.getElementById('case1-' + id) as HTMLInputElement;
    let case2Element = document.getElementById('case2-' + id) as HTMLInputElement;
    let case3Element = document.getElementById('case3-' + id) as HTMLInputElement;
    let radioElements = document.getElementsByName('radio-' + id) as NodeListOf<HTMLInputElement>;
    let levelElement = document.getElementById('level-' + id) as HTMLSelectElement;

    let questionText = questionElement?.value;
    let case1Text = case1Element.value;
    let case2Text = case2Element.value;
    let case3Text = case3Element.value;
    let level = levelElement.value;
    let correct = 0;

    for (let i = 0; i < 2; i++) {
      if (radioElements.item(i) && radioElements.item(i).checked) {
        correct = i + 1;
        break;
      }
    }
    test.question = questionText;
    test.case1 = case1Text;
    test.case2 = case2Text;
    test.case3 = case3Text;
    test.correct = correct;
    test.level = level;
    console.log('case1Text=' + case1Text + 'case2Text=' + case2Text + ', case3Text=' + case3Text + ', correct=' + correct + ", level=" + level);
    console.log('questionText=' + questionText);

    this.saveLevelTest(test);
  }

  deleteLevelTest(test: LevelTestDto, ind: number) {
    this.apiService.adminLevelTest('delete', test).subscribe(
      {
        next: value => {
          console.log('delete-level-test.next: value=' + JSON.stringify(value));
          this.levelTest = value ?? [];
        },
        error: value => {
          console.log('delete-level-test.error: value=' + JSON.stringify(value));
        }
      }
    )
  }

  remove(id: number) {
    const editingIndex = this.findLevelTestIndex(id);
    this.deleteLevelTest(this.levelTest[editingIndex], editingIndex);
  }

  changeOrder(ind1: number, ind2: number, currentTest: LevelTestDto) {
    this.apiService.adminLevelTest('change-order', currentTest).subscribe(
      {
        next: value => {
          const test1 = this.levelTest[ind1];
          this.levelTest[ind1] = this.levelTest[ind2];
          this.levelTest[ind2] = test1;
        },
        error: value => {
          console.log('changeOrder:error=>' + JSON.stringify(value));
        }
      }
    )
  }

  defineItemForChangeOrder(id: number, delta: number) {
    this.editingLineId = 0;
    const editingIndex = this.findLevelTestIndex(id);
    let test: LevelTestDto = this.levelTest[editingIndex];
    test.num += delta;
    this.levelTest[editingIndex + delta].num -= delta;
    this.changeOrder(editingIndex, editingIndex + delta, test);
    console.log('!! after this.levelTest[0].case1=' + this.levelTest[0].case1);
  }

  up(id: number) {
    this.defineItemForChangeOrder(id, -1);
  }

  down(id: number) {
    this.defineItemForChangeOrder(id, 1);
  }

  create(id: number) {
    const index = this.findLevelTestIndex(id);
    let num = this.levelTest[index].num;
    let level = this.levelTest[index].level;
    let test:LevelTestDto = {id:0,num:num,question:'',case1:'',case2:'',case3:'',correct:0,level:level};
    this.apiService.adminLevelTest('create', test).subscribe(
      {
        next: value => {
          this.levelTest = value;
        },
        error: value => {
          console.log('changeOrder:error=>' + JSON.stringify(value));
        }
      }
    )

  }

  findLevelTestIndex(id: number) {
    for (let i = 0; i < this.levelTest.length; i++) {
      if (this.levelTest[i].id === id) {
        console.log("findLevelTestIndex(" + id + ") return "+i);
        return i;
      }
    }
    console.error("findLevelTestIndex(" + id + ") return error")
    return -1;
  }
}
