import {Component} from '@angular/core';
import {LandingHeaderSectionComponent} from '../../sections/landing-header-section/landing-header-section.component';
import {
  LandingSubscribeSectionComponent
} from '../../sections/landing-subscribe-section/landing-subscribe-section.component';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hello-cabinet-page',
  standalone: true,
  imports: [
    LandingHeaderSectionComponent,
    LandingSubscribeSectionComponent,
    NgIf
  ],
  templateUrl: './hello-cabinet.component.html',
  styleUrl: './hello-cabinet.component.css'
})
export class HelloCabinetComponent {
  text: string = "";

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.cabinet()
      .subscribe({
        next: value => {
          this.text = 'next:'+JSON.stringify(value);
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
