import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {RegistrationFormComponent} from '../../forms/registration-form/registration-form.component';
import {RememberPasswordFormComponent} from '../../forms/remember-password-form/remember-password-form.component';
import {AuthenticationFormComponent} from '../../forms/authentication-form/authentication-form.component';

@Component({
  selector: 'app-login-page-section',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    NgIf,
    RegistrationFormComponent,
    RememberPasswordFormComponent,
    AuthenticationFormComponent
  ],
  templateUrl: './login-page-section.component.html',
  styleUrl: './login-page-section.component.css'
})
export class LoginPageSectionComponent {
  isAuthFormVisible: boolean = true;

  switchFormType(value:string) {
    console.log('login-page.switchFormType');
    this.isAuthFormVisible = !this.isAuthFormVisible;
  }

}
