import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LanguageSelectComponent} from '../../layouts/language-select/language-select.component';
import {LandingMenuComponent} from '../../layouts/landing-menu/landing-menu.component';
import {RouterLink} from '@angular/router';
import {LanguageService} from '../../../services/language.service';
import {LoginDialogComponent} from '../../dialog/login-dialog/login-dialog.component';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {LandingMainSectionComponent} from '../../sections/landing-main-section/landing-main-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  providers: [LoginDialogComponent],
  imports: [
    TranslatePipe,
    LanguageSelectComponent,
    LandingMenuComponent,
    RouterLink,
    LoginDialogComponent,
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    LandingMainSectionComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {


  constructor(private translate: TranslateService,
              private langService: LanguageService,
              private loginDialogComponent: LoginDialogComponent) {
    langService.initLanguage();
  }

  ngOnInit() {
    console.log('LandingPageComponent.ngOnInit(), check if need this method');
    this.langService.initLanguage();
  }



}
