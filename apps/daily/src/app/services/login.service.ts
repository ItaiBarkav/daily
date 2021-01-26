import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  teamName: string;
  startDate: Date;
  endDate: Date;
  sprintDuration: number;
  quarter: number;

  constructor() {}

  login(loginForm: FormGroup): void {
    const loginData = loginForm.value;
    this.teamName = loginData.teamName;
    this.startDate = loginData.startDate;
    this.endDate = loginData.endDate;
    this.sprintDuration = loginData.sprintDuration;
    this.quarter = loginData.quarter;
  }
}
