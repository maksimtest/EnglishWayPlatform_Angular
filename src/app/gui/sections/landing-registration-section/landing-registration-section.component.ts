import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {catchError, throwError} from 'rxjs';
import {RegistrationFormComponent} from '../../forms/registration-form/registration-form.component';
import {RememberPasswordFormComponent} from '../../forms/remember-password-form/remember-password-form.component';

@Component({
  selector: 'app-landing-registration-section',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    ReactiveFormsModule,
    RegistrationFormComponent,
    RememberPasswordFormComponent
  ],
  templateUrl: './landing-registration-section.component.html',
  styleUrl: './landing-registration-section.component.css'
})
export class LandingRegistrationSectionComponent {
  isRegistrationFormVisible: boolean = true;

  switchFormType(value:string) {
    console.log('landing-registration.switchFormType');
    this.isRegistrationFormVisible = !this.isRegistrationFormVisible;
  }
}
