import { Injectable } from '@angular/core';
import {Language} from '../interfaces/Language';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string = 'en';

  languages: Language[] = [
    {name: 'English', code: 'en'},
    {name: 'Ukraine', code: 'ukr'},
    {name: 'Russian', code: 'ru'},
  ]
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }
  initLanguage(){
    const savedLanguage = localStorage.getItem('language');
    //console.log('LanguageService.initLanguage(): savedLanguage', savedLanguage);
    if (savedLanguage) {
      //console.log('LanguageService.initLanguage(): change this.currentLanguage');
      this.currentLanguage = savedLanguage;
    }
    this.translate.use(this.currentLanguage);
  }
  getLanguages(): Language[] {
    return this.languages;
  }
  setCurrentLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    //console.log('LanguageService.setCurrentLanguage: currentLanguage', lang);
  }
  getCurrentLanguage(): string {
    return this.currentLanguage;
  }
}
