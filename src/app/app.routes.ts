import { Routes } from '@angular/router';
import {LandingPageComponent} from './gui/pages/landing-page/landing-page.component';
import {ActivatePageComponent} from './gui/pages/activate-page/activate-page.component';
import {CabinetPageComponent} from './gui/pages/cabinet-page/cabinet-page.component';
import {LoginPageComponent} from './gui/pages/login-page/login-page.component';
import {LandingRegistrationPageComponent} from './gui/pages/landing-registration-page/landing-registration-page.component';
import {ChangePasswordPageComponent} from './gui/pages/change-password-page/change-password-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  {
    path: 'main',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  {
    path: 'logout',
    component: LandingPageComponent,
    title: 'EnglishWayTogether',
  },
  {
    path: 'registration',
    component: LandingRegistrationPageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'activate',
    component: ActivatePageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'change',
    component: ChangePasswordPageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'cabinet',
    component: CabinetPageComponent,
    title: 'EnglishWayRegistration',
  },
  {
    path: 'login',
    component: LoginPageComponent,
    title: 'EnglishWayRegistration',
  },

];
