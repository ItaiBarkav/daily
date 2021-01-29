import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';

@Component({
  selector: 'manage-tool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private dialog: MatDialog) {}

  openAddMemberDialog(): void {
    this.dialog.open(AddMemberDialogComponent);
  }
}
