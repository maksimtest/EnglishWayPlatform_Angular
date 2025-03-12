import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormDetails} from '../../../interfaces/FormDetails';
import {AuthService} from '../../../services/auth.service';
import {ValidationFormsService} from '../../../services/validation-forms.service';
import {FormTemplateComponent} from '../form-template/form-template.component';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-remember-password-form',
  standalone: true,
  imports: [
    FormTemplateComponent,
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './remember-password-form.component.html'
})
export class RememberPasswordFormComponent {
  rememberForm: FormGroup;
  rememberFormDetails: Map<string, FormDetails>;
  isSuccessTextAfterRemember: boolean = false;
  connectionProblemVisible: boolean = false;
  @Input() changeTypeFormLink: string = "REGISTRATION-PAGE_MOVE_TO_REG_FORM";
  @Output() changeTypeFormEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private validationFormsService: ValidationFormsService) {
    this.rememberFormDetails = new Map<string, FormDetails>([
      ['email', {
        type: 'text',
        title: "EMAIL_TITLE",
        autocomplete: "email",
        placeholder: "Enter email",
        comment: ""
      }],
    ])
    this.rememberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onRememberSubmit() {
    if (this.rememberForm.valid) {
      this.authService.rememberPassword({
        email: this.rememberForm.get("email")?.value
      })
        .subscribe({
          next: value => {
            this.isSuccessTextAfterRemember = true
          },
          error: value => {
            console.error("error=" + JSON.stringify(value));
            if (value.status == 0) {
              this.connectionProblemVisible = true;
            } else {
              this.rememberForm.get('username')?.setErrors({'error': value.error});
            }
          }
        });
    } else {
      //this.showRegistrationErrors = true;
    }
  }

  switchTypeForm(value: string) {
    console.log("remember-form.switchTypeForm")
    this.changeTypeFormEvent.emit('change');
  }

}
