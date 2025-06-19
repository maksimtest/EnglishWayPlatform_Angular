import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {SettingsDto} from '../../../interfaces/SettingsDto';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit {
  arraySettings: SettingsDto[] = [];
  allowChangeDescription = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.apiService.adminSettings('get', undefined).subscribe({
      next: value => {
        this.arraySettings = value;

      },
      error: error => {
        console.log('adminSettings Get. error: ' + JSON.stringify(error));
      }
    })
  }

  editSettings(id:number) {
    let index = this.getIndexSettingsById(id);
    if(index !== undefined) {
      let item = this.arraySettings[index];
      item.editingMode = true;
    }
  }

  updateSettings(id: number) {
    let index = this.getIndexSettingsById(id);
    if(index === undefined) {
      return;
    }

    let settings = this.arraySettings[index];
    settings.editingMode = false;

    let descriptionEl = document.getElementById('admin-setting-description-' + id) as HTMLInputElement;
    settings.description = descriptionEl.value;

    let valueEl = document.getElementById('admin-setting-value-' + id) as HTMLInputElement;
    settings.value = valueEl.checked;

    this.apiService.adminSettings('update', settings).subscribe({
      next: value => {
        this.arraySettings[index] = value;
      }, error: err => {
        console.log('adminSettings Update. error: ' + JSON.stringify(err));
      }
    })
    //
    // this.editingMode = false;
  }

  getIndexSettingsById(id: number):number|undefined {
    for (let i = 0; i < this.arraySettings.length; i++) {
      if (this.arraySettings[i].id == id) {
        return i;
      }
    }
    return undefined;
  }
}
