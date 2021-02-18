import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamSchedule } from '@manage-tool/models';
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

  login(teamSchedule: TeamSchedule): void {
    this.authService.authLogin(true);
    this.teamScheduleStoreService.updateTeamSchedule(teamSchedule);
    this.islogin$.next(true);
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  islogin(): Observable<boolean> {
    return this.islogin$.asObservable();
  }
}
