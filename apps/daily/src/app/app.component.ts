import { Component, ViewEncapsulation } from '@angular/core';
import { ApolloService } from '@manage-tool/apollo';
import { LoginStatus, TeamSchedule } from '@manage-tool/models';
import { ThemeService } from 'libs/ui/src/lib/theme.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'manage-tool-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isDarkTheme: boolean;
  teamSchedule: TeamSchedule;

  constructor(
    private themeService: ThemeService,
    private loginService: LoginService,
    private apolloService: ApolloService
  ) {
    this.darkThemeSubscription();
    this.loginSubscription();
    this.teamScheduleSubscription();
  }

  updateTeamSchedule(teamSchedule: TeamSchedule): void {
    this.apolloService.updateTeamSchedule(teamSchedule);
  }

  private darkThemeSubscription(): void {
    this.themeService.isDarkTheme().subscribe((isDarkTheme: boolean) => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  private loginSubscription(): void {
    this.loginService.islogin().subscribe((loginStatus: LoginStatus) => {
      if (loginStatus.isLogin) {
        this.teamSchedule = this.apolloService.teamScheduleValue();
      }
    });
  }

  private teamScheduleSubscription(): void {
    this.apolloService
      .teamSchedule()
      .subscribe(
        (teamSchedule: TeamSchedule) => (this.teamSchedule = teamSchedule)
      );
  }
}
