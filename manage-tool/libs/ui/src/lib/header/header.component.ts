import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'manage-tool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  changeTheme(): void {
    this.themeService.changeTheme();
  }
}
