import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {LandingMenuComponent} from '../../layouts/landing-menu/landing-menu.component';
import {LanguageSelectComponent} from '../../layouts/language-select/language-select.component';
import {LoginDialogComponent} from '../../dialog/login-dialog/login-dialog.component';
import {NgClass, NgForOf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Language} from '../../../interfaces/Language';
import {LanguageService} from '../../../services/language.service';
import {MenuItemDto} from '../../../interfaces/MenuItemDto';
import {MenusService} from '../../../services/menus.service';

@Component({
  selector: 'app-landing-header-section',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    LandingMenuComponent,
    LanguageSelectComponent,
    LoginDialogComponent,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './landing-header-section.component.html',
  styleUrl: './landing-header-section.component.css'
})
export class LandingHeaderSectionComponent implements OnInit {
  languages: Language[] = [];
  currentLanguage: string="en";
  isLoginDialogVisible: boolean = false;
  menu: MenuItemDto[] | undefined;
  currentMenuUrl:string = "";
  isSectionFixed: boolean = false;
  @Input('AlwaysSectionFixed') isAlwaysSectionFixed: boolean= false;
  constructor(private menusService: MenusService,
              private translate: TranslateService,
              private languageService: LanguageService,
              private router: Router) {
    this.menu = menusService.getMenu("LANDING-MAIN-MENU");
    this.languages = languageService.getLanguages();
    this.currentLanguage = languageService.getCurrentLanguage();
  }
  ngOnInit() {
    this.init();
  }
  init(){
    this.isSectionFixed = this.isAlwaysSectionFixed;
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.currentMenuUrl = this.router.url;
    console.log('landing-header-section: init(), this.currentMenuUrl='+this.currentMenuUrl);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSectionFixed = this.isAlwaysSectionFixed || window.scrollY > 50;
  }
  onLanguageChange(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.languageService.setCurrentLanguage(lang);
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  openLoginDialog() {
    console.log('openLoginDialog');
    this.isLoginDialogVisible = true;
  }
  closeLoginDialog() {
    this.isLoginDialogVisible = false;
  }
}
