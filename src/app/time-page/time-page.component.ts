import { Component } from '@angular/core';

@Component({
  selector: 'app-time-page',
  templateUrl: './time-page.component.html',
  styleUrls: ['./time-page.component.css']
})
export class TimePageComponent {
  currentDate: string = '';
  currentTime: string = '';

  constructor() {
    this.updateDate();
    this.updateTime();
    setInterval(() => this.updateDate(), 13000);
    setInterval(() => this.updateTime(), 13000);
  }

  updateDate() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString().replace(/\//g, '.');
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
  }
}
