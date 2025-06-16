import {Component} from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {ApiService} from '../../../services/api.service';
import {NgIf} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MenusService} from '../../../services/menus.service';
import {Menu} from '../../../interfaces/Menu';
import {MenuItem} from '../../../interfaces/MenuItem';
import {CabinetAsideComponent} from '../../layouts/cabinet-aside/cabinet-aside.component';
import {CabinetMainComponent} from '../../layouts/cabinet-main/cabinet-main.component';

@Component({
  selector: 'app-inner-page-template',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    NgIf,
    CabinetAsideComponent,
    CabinetMainComponent,
    RouterOutlet
  ],
  templateUrl: './inner-page-template.component.html',
  styleUrl: './inner-page-template.component.css'
})
export class InnerPageTemplateComponent {
  text: string = "";
  mainMenu: MenuItem[] =[];
  asideMenu: MenuItem[]=[];
  roles: string="";
  constructor(private apiService: ApiService,
              private router: Router,
              private menusService:MenusService) {
    this.initMenu();
    this.init();
  }
  initMenu(){
    this.mainMenu = this.menusService.getMenu('cabinet-page-menu')?? [];
    this.asideMenu = this.menusService.getMenu('cabinet-page-menu')?? [];
  }
  init() {
    this.apiService.innerPage()
      .subscribe({
        next: value => {
          this.mainMenu = value.mainMenu ?? [];
          this.roles = value.roles;
          //this.asideMenu = value.asideMenu.items ?? [];
          console.log('cabinet.next:value='+JSON.stringify(value))
          console.log('cabinet.next: mainMenu='+this.mainMenu)
          console.log('cabinet.next: roles='+this.roles)
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
}
