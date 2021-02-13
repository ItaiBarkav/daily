import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamSchedule } from '@manage-tool/models';
import { ThemeService } from '../theme.service';
import { SettingsDialogComponent } from './settings-dialog/settings-dialog.component';

@Component({
  selector: 'manage-tool-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() teamSchedule: TeamSchedule;

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService, private dialog: MatDialog) {
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

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
