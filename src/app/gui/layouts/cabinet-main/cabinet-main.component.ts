import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItem} from '../../../interfaces/MenuItem';
import {NgClass, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cabinet-main',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './cabinet-main.component.html',
  styleUrl: './cabinet-main.component.css'
})
export class CabinetMainComponent {
  @Input() menu: MenuItem[]=[];
  @Input() currentPageByMenuItem: string="Home";
  @Output() logoutEvent = new EventEmitter();

  logout(){
    this.logoutEvent.emit();
  }
}
