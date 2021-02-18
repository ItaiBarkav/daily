import { Component, EventEmitter, Output } from '@angular/core';
import { TeamSchedule } from '@manage-tool/models';

@Component({
  selector: 'manage-tool-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent {
  @Output() teamSchedule = new EventEmitter<TeamSchedule>();

  constructor() {}

  saveSettings(teamSchedule: TeamSchedule): void {
    this.teamSchedule.emit(teamSchedule);
  }
}
