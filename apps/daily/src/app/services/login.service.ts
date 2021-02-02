import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamSchedule } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private islogin$ = new BehaviorSubject<boolean>(false);
  private teamSchedule: TeamSchedule;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  get teamScheduleData(): TeamSchedule {
    return this.teamSchedule;
  }

  login(loginForm: FormGroup): void {
    this.authService.authLogin(true);
    this.teamSchedule = loginForm.value;
    this.islogin$.next(true);
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  islogin(): Observable<boolean> {
    return this.islogin$.asObservable();
  }
}
