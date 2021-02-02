import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TeamMemberService } from '../services/team-members.service';

@Component({
  selector: 'manage-tool-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
})
export class AddMemberDialogComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(private addMemberService: TeamMemberService) {}

  addTeamMember(): void {
    this.addMemberService.addTeamMember(this.name.value);
  }
}
