import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus, TeamSchedule } from '@manage-tool/models';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'manage-tool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
    this.isLoginSubscription();
  }

  login(teamSchedule: TeamSchedule): void {
    this.loginService.login(teamSchedule);
  }

  private isLoginSubscription(): void {
    this.loginService
      .islogin()
      .pipe(
        distinctUntilChanged(),
        map((loginStatus: LoginStatus) => {
          if (loginStatus.isLogin) {
            this.router.navigate(['/dashboard'], {
              queryParams: { team: loginStatus.teamName },
            });
          }
        })
      )
      .subscribe();
  }
}
