import { Component, Input } from '@angular/core';

@Component({
  selector: 'manage-tool-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss'],
})
export class TeamMemberCardComponent {
  @Input() name: string;

  constructor() {}
}
