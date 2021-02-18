import { Component } from '@angular/core';
import { TeamSchedule } from '@manage-tool/models';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'manage-tool-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private loginService: LoginService) {}

  login(teamSchedule: TeamSchedule): void {
    this.loginService.login(teamSchedule);
  }
}
