import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { TeamMemberService } from '../services/team-members.service';

@Component({
  selector: 'manage-tool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private addMemberService: TeamMemberService,
    private dialog: MatDialog
  ) {}

  openAddMemberDialog(): void {
    this.dialog.open(AddMemberDialogComponent);
  }

  deleteMember(name: string): void {
    this.addMemberService.removeTeamMember(name);
  }

  getTeamMembersNames(): Observable<string[]> {
    return this.addMemberService.teamMembersNames();
  }
}
