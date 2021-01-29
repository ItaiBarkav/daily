import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoginData } from '@manage-tool/models';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'manage-tool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() loginData: LoginData;

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe(
      (isDarkTheme: boolean) => (this.isDarkTheme = isDarkTheme)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loginData = changes.loginData.currentValue;
  }

  changeTheme(): void {
    this.themeService.changeTheme();
  }
}
