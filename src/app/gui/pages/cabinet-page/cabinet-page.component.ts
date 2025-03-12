import {Component} from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {MenusService} from '../../../services/menus.service';
import {Menu} from '../../../interfaces/Menu';
import {MenuItem} from '../../../interfaces/MenuItem';
import {CabinetAsideComponent} from '../../layouts/cabinet-aside/cabinet-aside.component';
import {CabinetMainComponent} from '../../layouts/cabinet-main/cabinet-main.component';

@Component({
  selector: 'app-cabinet-page',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    NgIf,
    CabinetAsideComponent,
    CabinetMainComponent
  ],
  templateUrl: './cabinet-page.component.html',
  styleUrl: './cabinet-page.component.css'
})
export class CabinetPageComponent {
  text: string = "";
  mainMenu: MenuItem[] =[];
  asideMenu: MenuItem[]=[];
  constructor(private authService: AuthService,
              private router: Router,
              private menusService:MenusService) {
    this.init();
    //this.initMenu();
  }
  initMenu(){
    this.mainMenu = this.menusService.getMenu('cabinet-page-menu')?? [];
    this.asideMenu = this.mainMenu;
  }
  init() {
    this.authService.cabinet()
      .subscribe({
        next: value => {
          this.mainMenu = value.mainMenu.items ?? [];
          this.asideMenu = value.asideMenu.items ?? [];
          console.log('next:'+JSON.stringify(value))
          //this.text = 'next:'+JSON.stringify(value);
        },
        error: value => {
          console.log('error:'+JSON.stringify(value));
          if(value.status == 401) {
            this.text = "Unauthorized";
          }
        }
      })
  }

  logout() {
    console.log("logout");
    localStorage.removeItem('jwtToken');
    this.checkToken();
  }
  checkToken(){
    if(!localStorage.getItem('jwtToken')){
      this.router.navigate(["/"]);
    }
  }
  checkCabinet(){
    this.checkToken();
    this.authService.cabinet()
      .subscribe({
        next: value => {
          this.text = 'Ok';
        },
        error: value => {
          console.log('error:'+JSON.stringify(value));
          this.text = "check";
          if(value.status == 200) {
            this.text = "successful";
          }
          if(value.status == 401) {
            this.text = "Unauthorized";
          }
        }
      })
  }
}
