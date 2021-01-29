import { Component, ViewEncapsulation } from '@angular/core';
import { LoginData } from '@manage-tool/models';
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
  loginData: LoginData;

  constructor(
    private themeService: ThemeService,
    private loginService: LoginService
  ) {
    this.darkThemeSubscription();
    this.loginSubscription();
  }

  private darkThemeSubscription(): void {
    this.themeService.isDarkTheme.subscribe((isDarkTheme: boolean) => {
      this.isDarkTheme = isDarkTheme;
    });
  }

  private loginSubscription(): void {
    this.loginService.islogin().subscribe((isLogin: boolean) => {
      if (isLogin) {
        this.loginData = this.loginService.loginData;
      }
    });
  }
}
