import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {LandingMenuComponent} from '../../layouts/landing-menu/landing-menu.component';
import {LanguageSelectComponent} from '../../layouts/language-select/language-select.component';
import {LoginDialogComponent} from '../../dialog/login-dialog/login-dialog.component';

@Component({
  selector: 'app-landing-header-section',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    LandingMenuComponent,
    LanguageSelectComponent,
    LoginDialogComponent
  ],
  templateUrl: './landing-header-section.component.html',
  styleUrl: './landing-header-section.component.css'
})
export class LandingHeaderSectionComponent {
  isLoginDialogVisible: boolean = false;
  openLoginDialog() {
    this.isLoginDialogVisible = true;
  }
  closeLoginDialog() {
    this.isLoginDialogVisible = false;
  }
}
