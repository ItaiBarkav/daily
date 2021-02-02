import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { TeamScheduleStoreService } from './team-schedule-store.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private islogin$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private teamScheduleStoreService: TeamScheduleStoreService
  ) {}

  login(loginForm: FormGroup): void {
    this.authService.authLogin(true);
    this.teamScheduleStoreService.updateTeamScheduale(loginForm.value);
    this.islogin$.next(true);
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  islogin(): Observable<boolean> {
    return this.islogin$.asObservable();
  }
}
