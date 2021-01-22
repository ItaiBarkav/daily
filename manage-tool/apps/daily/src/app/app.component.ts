import { Component, ViewEncapsulation } from '@angular/core';
import { ThemeService } from 'libs/ui/src/lib/theme.service';

@Component({
  selector: 'manage-tool-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe((isDarkTheme: boolean) => {
      this.isDarkTheme = isDarkTheme;
    });
  }
}
