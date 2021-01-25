import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'manage-tool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe(
      (isDarkTheme: boolean) => (this.isDarkTheme = isDarkTheme)
    );
  }

  changeTheme(): void {
    this.themeService.changeTheme();
  }
}
