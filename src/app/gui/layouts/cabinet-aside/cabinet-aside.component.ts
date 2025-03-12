import {Component, Input} from '@angular/core';
import {MenuItem} from '../../../interfaces/MenuItem';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cabinet-aside',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './cabinet-aside.component.html',
  styleUrl: './cabinet-aside.component.css'
})
export class CabinetAsideComponent {
  @Input() menu: MenuItem[]=[];
  companyName: string = "ENGLISH WAY";
}
