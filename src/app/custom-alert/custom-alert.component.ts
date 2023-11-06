import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {
  @Input() message: string = 'Invalid data';
  showAlert: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  displayAlert(duration: number) {
    console.log("Display alert");
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, duration);
  }
}
