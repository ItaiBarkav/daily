import { Component, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeamMemberService } from '../services/team-members.service';

@Component({
  selector: 'manage-tool-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
})
export class AddMemberDialogComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(
    private teamMemberService: TeamMemberService,
    private dialogRef: MatDialogRef<AddMemberDialogComponent>
  ) {}

  addTeamMember(): void {
    this.teamMemberService.addTeamMember(this.name.value);
  }

  @HostListener('document:keydown.enter', ['$event'])
  keyEvent(): void {
    if (this.name.valid) {
      this.addTeamMember();
      this.dialogRef.close();
    }
  }
}
