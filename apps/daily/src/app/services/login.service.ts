import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from '@manage-tool/apollo';
import { LoginStatus, TeamSchedule } from '@manage-tool/models';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private apolloService: ApolloService
  ) {}

  login(teamSchedule: TeamSchedule): void {
    this.authService.authLogin(true, teamSchedule.teamName);
    this.apolloService.updateTeamSchedule(teamSchedule);
    this.router.navigate(['/dashboard'], {
      relativeTo: this.route,
      queryParams: { team: teamSchedule.teamName },
    });
  }

  islogin(): Observable<LoginStatus> {
    return this.authService.isAuth();
  }
}
