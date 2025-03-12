import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormDetails} from '../../../interfaces/FormDetails';
import {AuthService} from '../../../services/auth.service';
import {ValidationFormsService} from '../../../services/validation-forms.service';
import {FormTemplateComponent} from '../form-template/form-template.component';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [
    FormTemplateComponent,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.css'
})
export class AuthenticationFormComponent {
  authForm: FormGroup;
  authFormDetails: Map<string, FormDetails>;
  isSuccessTextVisible: boolean = false;
  connectionProblemVisible: boolean = false;
  errorText: string = "";
  @Output() changeTypeFormEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private validationFormsService: ValidationFormsService,
              private router: Router) {
    this.authFormDetails = new Map<string, FormDetails>([
      ['username', {
        type: 'text',
        title: "USERNAME_TITLE",
        autocomplete: "username",
        placeholder: " Enter username",
        comment: ""
      }],
      ['password', {
        type: 'password',
        title: "PASSWORD_TITLE",
        autocomplete: "new-password",
        placeholder: "",
        comment: ""
      }],
    ])
    this.authForm = this.fb.group({
      username: ['user1', [Validators.required, Validators.minLength(1), validationFormsService.usernameValidator]],
      password: ['123', [Validators.required, validationFormsService.passwordValidator]]
    });
  }

  onFormSubmit() {
    if (this.authForm.valid) {
      this.authService.login({
        username: this.authForm.get("username")?.value,
        password: this.authForm.get("password")?.value
      })
        .subscribe({
          next: value => {
            console.log("login: value=" + JSON.stringify(value));
            let token = value.token;
            if (token) {
              localStorage.setItem('jwtToken', token);
            }
            this.router.navigate(['/cabinet']);
          },
          error: value => {
            if (value.status == 0) {
              this.connectionProblemVisible = true;
            } else {
              this.errorText = value.error;
            }
          }
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
