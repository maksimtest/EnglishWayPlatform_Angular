import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {HistoryDto} from '../../../interfaces/HistoryDto';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-history',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './admin-history.component.html',
  styleUrl: './admin-history.component.css'
})
export class AdminHistoryComponent implements OnInit {
  histories: HistoryDto[]=[];

  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.initData();
  }
  initData(){
    this.apiService.adminHistory().subscribe({
      next: value => {
        this.histories = value;
      },
      error: error => {console.log('adminHistory. error: ' + JSON.stringify(error));}
    })
  }
}
