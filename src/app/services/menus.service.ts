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
        {name: "LANDING-MAIN_MENU_ITEM1", url: "/"},
        {name: "LANDING-MAIN_MENU_ITEM2", url: "/main"},
        {name: "LANDING-MAIN_MENU_ITEM3", url: "/main2"},
        {name: "LANDING-MAIN_MENU_ITEM4", url: "#"},
      ]
    },
    {
      description: "hello-cabinet-page-menu",
      menu: [
        {name: "Item111", url: "#1"},
        {name: "Item211", url: "menu"},
        {name: "Item311", url: "#3"},
        {name: "Item411", url: "#4"},
      ]
    }
  ]

  getMenu(describe: string):MenuItem[] | undefined {
    return this.menus.find(item=>item.description==describe)?.menu;
  }
}
