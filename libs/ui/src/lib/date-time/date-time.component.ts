import { Component } from '@angular/core';

@Component({
  selector: 'manage-tool-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent {
  dateTime: any;
  constructor() {
    setInterval(() => (this.dateTime = new Date()), 1000);
  }
}
