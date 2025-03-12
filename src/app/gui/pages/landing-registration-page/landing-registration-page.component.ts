import { Component } from '@angular/core';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingRegistrationSectionComponent
} from '../../sections/landing-registration-section/landing-registration-section.component';

@Component({
  selector: 'app-landing-registration-page',
  standalone: true,
  imports: [
    LandingSubscribeSectionComponent,
    LandingHeaderSectionComponent,
    LandingRegistrationSectionComponent
  ],
  templateUrl: './landing-registration-page.component.html',
  styleUrl: './landing-registration-page.component.css'
})
export class LandingRegistrationPageComponent {

}
