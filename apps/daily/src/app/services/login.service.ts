import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  teamName: string;
  startDate: Date;
  endDate: Date;
  sprintDuration: number;
  quarter: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  login(loginForm: FormGroup): void {
    this.authService.isLogin = true;

    const loginData = loginForm.value;
    this.teamName = loginData.teamName;
    this.startDate = loginData.startDate;
    this.endDate = loginData.endDate;
    this.sprintDuration = loginData.sprintDuration;
    this.quarter = loginData.quarter;

    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }
}
