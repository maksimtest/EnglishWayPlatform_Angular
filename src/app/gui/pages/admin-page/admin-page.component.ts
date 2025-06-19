import { Component } from '@angular/core';
import {InnerAsideBlockComponent} from '../../layouts/inner-aside-block/inner-aside-block.component';
import {InnerMainBlockComponent} from '../../layouts/inner-main-block/inner-main-block.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    InnerAsideBlockComponent,
    InnerMainBlockComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

}
