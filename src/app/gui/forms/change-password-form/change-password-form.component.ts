import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormDetails} from '../../../interfaces/FormDetails';
import {AuthService} from '../../../services/auth.service';
import {ValidationFormsService} from '../../../services/validation-forms.service';
import {FormTemplateComponent} from '../form-template/form-template.component';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-change-password-form',
  standalone: true,
  imports: [
    FormTemplateComponent,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent {
  changePasswordForm: FormGroup;
  changePasswordFormDetails: Map<string, FormDetails>;
  isSuccessTextVisible: boolean = false;
  connectionProblemVisible: boolean = false;
  errorText: string = "";
  isComponentErrorVisible: boolean = false;
  @Input({required: true}) code: string = "";

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private validationFormsService: ValidationFormsService) {
    this.changePasswordFormDetails = new Map<string, FormDetails>([
      ['password', {
        type: 'password',
        title: "PASSWORD_TITLE",
        autocomplete: "new-password",
        placeholder: "",
        comment: ""
      }],
      ['confirmPassword', {
        type: 'password',
        title: "CONFIRM_PASSWORD_TITLE",
        autocomplete: "new-password",
        placeholder: "",
        comment: ""
      }],
    ])
    this.changePasswordForm = this.fb.group({
      password: ['123', [Validators.required, validationFormsService.passwordValidator, validationFormsService.passwordMatchValidator]],
      confirmPassword: ['123', [Validators.required, validationFormsService.confirmPasswordMatchValidator]]
    });
  }

  onSubmit() {
    this.isComponentErrorVisible = true;
    if (this.changePasswordForm.valid) {
      this.authService.changePassword({
        password: this.changePasswordForm.get("password")?.value,
        code: this.code
      })
        .subscribe({
          next: value => {
            this.isSuccessTextVisible = true
          },
          error: value => {
            console.error("error=" + JSON.stringify(value));
            if (value.status == 0) {
              this.connectionProblemVisible = true;
            } else {
              this.errorText = value.error;
            }
          }
        });
    }
  }
}
