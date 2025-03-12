import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {LanguageService} from '../../../services/language.service';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {ChangePasswordFormComponent} from '../../forms/change-password-form/change-password-form.component';

@Component({
  selector: 'app-activated-page-page',
  standalone: true,
  imports: [
    TranslatePipe,
    NgIf,
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    ChangePasswordFormComponent
  ],
  templateUrl: './activate-page.component.html',
  styleUrl: './activate-page.component.css'
})
export class ActivatePageComponent {
  isActivatedInfoVisible = false;
  errorText: string = "";

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.languageService.initLanguage();
    let code = this.route.snapshot.queryParamMap.get('code');
    console.log('activated-page.page, code=', code);
    this.authService.active(code)
      .subscribe({
        next: value => {
          console.log("next.value=" + JSON.stringify(value));
          this.isActivatedInfoVisible = true
        },
        error: value => {
          console.log("error.value=" + JSON.stringify(value));
          this.errorText = value.error;
          if (value.status == 0) {
            this.errorText = 'unknown problem';
          }
          this.isActivatedInfoVisible = false;
        }
      });
  }
}
