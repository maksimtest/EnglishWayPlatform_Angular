import {Component} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {LanguageService} from '../../../services/language.service';
import {ChangePasswordFormComponent} from '../../forms/change-password-form/change-password-form.component';
import {NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {LandingHeaderSectionComponent} from "../../sections/landing-header-section/landing-header-section.component";
import {
    LandingSubscribeSectionComponent
} from "../../sections/landing-subscribe-section/landing-subscribe-section.component";

@Component({
    selector: 'app-change-password-page',
    standalone: true,
    imports: [
        ChangePasswordFormComponent,
        NgIf,
        TranslatePipe,
        LandingHeaderSectionComponent,
        LandingSubscribeSectionComponent
    ],
    templateUrl: './change-password-page.component.html',
    styleUrl: './change-password-page.component.css'
})
export class ChangePasswordPageComponent {
    code: string = "";
    errorText: string = "";
    isChangePasswordVisible: boolean = false;

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private languageService: LanguageService
    ) {
        console.log('ChangePasswordPageComponent.constructor')
        this.init()
    }

    ngOnInit() {
        console.log('ChangePasswordPageComponent.ngOnInit')
    }

    init() {
        this.languageService.initLanguage();
        this.code = this.route.snapshot.queryParamMap.get('code') ?? "";
        if (!this.code) {
            this.errorText = "REMEMBER-PASSWORD-PAGE_INVALID_CODE";
            return;
        }
        console.log('activated-page.page, code=', this.code);
        this.authService.active(this.code)
            .subscribe({
                next: value => {
                    this.isChangePasswordVisible = true;
                    console.log("next.value=" + JSON.stringify(value));
                    //      this.isActivatedInfoVisible = true
                },
                error: value => {
                    console.log("error.value=" + JSON.stringify(value));

                    if (value.status == 0) {
                        this.errorText = 'unknown problem';
                    } else {
                        this.errorText = value.error;
                    }
                }
            });
    }

}
