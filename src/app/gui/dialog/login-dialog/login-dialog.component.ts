import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {AuthenticationFormComponent} from '../../forms/authentication-form/authentication-form.component';
import {RememberPasswordFormComponent} from '../../forms/remember-password-form/remember-password-form.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe,
    RouterLink,
    AuthenticationFormComponent,
    RememberPasswordFormComponent
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();  // Событие закрытия окна
  isAuthMode: boolean = true;

  // authName: string= "";
  // authPassword: string = "";
  //
  // regName: string= "";
  // regPassword: string = "";
  // regEmail: string = "";

  constructor(private translate: TranslateService) {}

  switchFormType(value:string) {
    console.log('login-page.switchFormType');
    this.isAuthMode = !this.isAuthMode;
  }

  onClose() {
    this.isAuthMode = true;
    this.closeModal.emit(); // Закрытие через родителя
  }
}
