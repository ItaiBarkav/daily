import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TeamSchedule } from '@manage-tool/models';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'manage-tool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() teamSchedule: TeamSchedule;

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme.subscribe(
      (isDarkTheme: boolean) => (this.isDarkTheme = isDarkTheme)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.teamSchedule = changes.teamSchedule.currentValue;
  }

  changeTheme(): void {
    this.themeService.changeTheme();
  }
}
