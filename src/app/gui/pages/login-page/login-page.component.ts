import { Component } from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingRegistrationSectionComponent
} from '../../sections/landing-registration-section/landing-registration-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {LoginPageSectionComponent} from '../../sections/login-page-section/login-page-section.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingRegistrationSectionComponent,
    LandingSubscribeSectionComponent,
    LoginPageSectionComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
