import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../../../interfaces/Language';
import {LanguageService} from '../../../services/language.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './language-select.component.html',
  styleUrl: './language-select.component.css'
})
export class LanguageSelectComponent {
  languages: Language[] = [];
  currentLanguage: string="en";
  constructor(private translate: TranslateService,
              private languageService: LanguageService) {
    this.languages = languageService.getLanguages();
    this.currentLanguage = languageService.getCurrentLanguage();
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    //console.log("LanguageSelect.ngOnInit(), this.currentLanguage=",this.currentLanguage);
  }

  onLanguageChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setCurrentLanguage(lang);
    this.currentLanguage = this.languageService.getCurrentLanguage();
    //console.log("LanguageSelect.onLanguageChange, lang=",lang);
  }
}
