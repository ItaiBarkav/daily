import { Component } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'manage-tool-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.scss'],
})
export class DateTimeComponent {
  private dateTime$ = new ReplaySubject<Date>(1);

  constructor() {
    this.dateTime$.subscribe(() => {
      setTimeout(() => {
        this.updateDateTime();
      }, 1000);
    });

    this.updateDateTime();
  }

  dateTime(): Observable<Date> {
    return this.dateTime$.asObservable();
  }

  private updateDateTime(): void {
    this.dateTime$.next(new Date());
  }
}
