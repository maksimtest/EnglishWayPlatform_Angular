import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from '../../../services/auth.service';
import {ValidationFormsService} from '../../../services/validation-forms.service';
import {FormTemplateComponent} from '../form-template/form-template.component';
import {FormDetails} from '../../../interfaces/FormDetails';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    FormTemplateComponent,
    RouterLink
  ],
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
  registerForm: FormGroup;
  registerFormDetails: Map<string, FormDetails>;
  isSuccessTextAfterRegisterVisible: boolean = false;
  connectionProblemVisible: boolean = false;
  errorText: string = "";
  isRegisterErrorVisible: boolean = false;
  @Output() changeTypeFormEvent = new EventEmitter<string>();
//  showRegistrationErrors: boolean = false;
//  changeTypeForm = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private validationFormsService: ValidationFormsService) {
    this.registerFormDetails = new Map<string, FormDetails>([
      ['username', {
        type: 'text',
        title: "USERNAME_TITLE",
        autocomplete: "username",
        placeholder: "",
        comment: "REGISTRATION-PAGE_USERNAME_COMMENT"
      }],
      ['previousUsername', {type: '', title: "", autocomplete: "", placeholder: "", comment: ""}],
      ['name', {
        type: 'text',
        title: "NAME_TITLE",
        autocomplete: "name",
        placeholder: "",
        comment: "REGISTRATION-PAGE_NICKNAME_COMMENT"
      }],
      ['email', {
        type: 'text',
        title: "EMAIL_TITLE",
        autocomplete: "email",
        placeholder: "",
        comment: "REGISTRATION-PAGE_EMAIL_COMMENT"
      }],
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
    this.registerForm = this.fb.group({
      username: ['user1', [Validators.required, Validators.minLength(1), validationFormsService.usernameValidator]],
      previousUsername: [''],
      name: ['user1-cheg', [Validators.required, Validators.minLength(1), validationFormsService.nicknameValidator]],
      email: ['1@admin.com', [Validators.required, Validators.email]],
      password: ['123', [Validators.required, validationFormsService.passwordValidator, validationFormsService.passwordMatchValidator]],
      confirmPassword: ['123', [Validators.required, validationFormsService.confirmPasswordMatchValidator]]
    });
  }

  onRegisterSubmit() {
    console.log('registration-form.onRegisterSubmit(), this.registerForm.valid=' + this.registerForm.valid);
    this.isRegisterErrorVisible = true;
    if (this.registerForm.valid) {
      this.registerForm.get('previousUsername')?.setValue(this.registerForm.get('username')?.value);
      this.authService.reg({
        username: this.registerForm.get("username")?.value,
        name: this.registerForm.get("name")?.value,
        password: this.registerForm.get("password")?.value,
        email: this.registerForm.get("email")?.value
      })
        .subscribe({
          next: value => {
            this.isSuccessTextAfterRegisterVisible = true
          },
          error: value => {
            console.error("error=" + JSON.stringify(value));
            if (value.status == 0) {
              this.connectionProblemVisible = true;
            } else if (value.error === "USERNAME_ALREADY_EXISTS") {
              console.log("USERNAME_ALREADY_EXISTS was fixed");
              this.registerForm.get('username')?.setErrors({'error': value.error});
            } else if (value.error === "EMAIL_ALREADY_EXISTS") {
              this.registerForm.get('email')?.setErrors({'error': value.error});
            } else {
              this.errorText = value.error;
            }
          }
          // , complete: () => console.log('complete')
        });
    } else {
      //this.showRegistrationErrors = true;
    }
  }

  switchTypeForm(value: string) {
    console.log("registration-form.switchTypeForm")
    this.changeTypeFormEvent.emit('change');
  }
}

