import {Injectable} from '@angular/core';
import {Language} from '../interfaces/Language';
import {Menu} from '../interfaces/Menu';
import {MenuItem} from '../interfaces/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() {
  }

  menus: Menu[] = [
    {
      description: "LANDING-MAIN-MENU",
      menu: [
        {name: "LANDING-MAIN_MENU_ITEM1", url: "/", img:"", title:""},
        {name: "LANDING-MAIN_MENU_ITEM2", url: "/main", img:"", title:""},
        {name: "LANDING-MAIN_MENU_ITEM3", url: "/main2", img:"", title:""},
        {name: "LANDING-MAIN_MENU_ITEM4", url: "#", img:"", title:""},
      ]
    },
    {
      description: "cabinet-page-menu",
      menu: [
        {name: "Home", url: "#", img:"images/home-icon.png", title:""},
        {name: "Home2", url: "menu", img:"images/users-icon.png", title:""},
        {name: "Home3", url: "#3", img:"images/download-icon.png", title:""},
        {name: "Home4", url: "#3", img:"images/download-icon.png", title:""},
      ]
    }
  ]

  getMenu(describe: string):MenuItem[] | undefined {
    return this.menus.find(item=>item.description==describe)?.menu;
  }
}
