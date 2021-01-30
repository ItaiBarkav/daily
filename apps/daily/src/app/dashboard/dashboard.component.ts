import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { AddMemberService } from '../services/add-member.service';

@Component({
  selector: 'manage-tool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  names = new Array<string>();

  constructor(
    private dialog: MatDialog,
    private addMemberService: AddMemberService
  ) {
    this.addMemberService.name().subscribe((name: string) => {
      if (name) {
        this.names.push(name);
      }
    });
  }

  openAddMemberDialog(): void {
    this.dialog.open(AddMemberDialogComponent);
  }
}
