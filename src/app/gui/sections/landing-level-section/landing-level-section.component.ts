import {Component, OnInit} from '@angular/core';
import {LevelsService} from '../../../services/levels.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {AnimateDirectiveIntersection} from '../../../interceptors/AnimateDirectiveInterception';
import {_} from '@ngx-translate/core';

@Component({
  selector: 'app-landing-level-section',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    AnimateDirectiveIntersection
  ],
  templateUrl: './landing-level-section.component.html',
  styleUrl: './landing-level-section.component.css'
})
export class LandingLevelSectionComponent implements OnInit {
  activeLevelCode: string = '';
  fromRightAnimationDirection: boolean=true;
  levels: any[]=[];
  constructor(private levelsService: LevelsService) {
    this.levels = levelsService.getLevelsWithLevels();
    this.activeLevelCode = this.levels.at(1).code;
  }
  ngOnInit(): void {

  }

  changeActiveLevel(levelCode: string){
    this.fromRightAnimationDirection =
      this.levelsService.getLevelCode(levelCode) <=
      this.levelsService.getLevelCode(this.activeLevelCode);

    this.activeLevelCode = levelCode;
  }
  getLevelDirection(index: number): 'from-left' | 'from-bottom' | 'from-right' {
    if (2 * index >= this.levels.length) return 'from-left';
    return 'from-right';
  }
}
