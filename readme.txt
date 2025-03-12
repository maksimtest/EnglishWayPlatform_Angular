---  LOCALIZATION  ---
npm install @ngx-translate/core @ngx-translate/http-loader

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

assets/i18n/en.json
{
  "HELLO": "Hello!",
  "WELCOME": "Welcome to our application"
}

<p>{{ 'WELCOME' | translate }}</p>
<button (click)="switchLanguage('en')">English</button>

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en'); // Язык по умолчанию
    translate.use('en'); // Можно заменить на язык из localStorage
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
----------------------------------------
