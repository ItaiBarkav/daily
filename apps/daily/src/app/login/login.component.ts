import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeamSchedule } from '@manage-tool/models';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'manage-tool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
    this.isLoginSubscribtion();
  }

  login(teamSchedule: TeamSchedule): void {
    this.loginService.login(teamSchedule);
  }

  private isLoginSubscribtion(): void {
    this.loginService
      .islogin()
      .pipe(
        distinctUntilChanged(),
        map((isLogin: boolean) => {
          if (isLogin) {
            this.router.navigate(['/dashboard']);
          }
        })
      )
      .subscribe();
  }
}
