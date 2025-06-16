import { Component } from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-main-section',
  standalone: true,
    imports: [
        TranslatePipe
    ],
  templateUrl: './landing-main-section.component.html',
  styleUrl: './landing-main-section.component.css'
})
export class LandingMainSectionComponent {
  constructor(private router: Router) {}
  moveToLevelTest(){
    this.router.navigate(['level-test']);//.then(r => );
  }
}
