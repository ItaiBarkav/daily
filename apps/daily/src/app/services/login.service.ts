import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApolloService } from '@manage-tool/apollo';
import { TeamSchedule } from '@manage-tool/models';
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
    this.authService.authLogin(true);
    this.apolloService.updateTeamSchedule(teamSchedule);
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  islogin(): Observable<boolean> {
    return this.authService.isAuth();
  }
}
