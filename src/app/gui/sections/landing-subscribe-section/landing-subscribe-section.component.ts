import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-landing-subscribe-section',
  standalone: true,
    imports: [
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './landing-subscribe-section.component.html',
  styleUrl: './landing-subscribe-section.component.css'
})
export class LandingSubscribeSectionComponent {

}
