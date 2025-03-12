import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

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

}
