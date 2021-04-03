import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApolloService } from '@manage-tool/apollo';
import { TeamMember, TeamMembers } from '@manage-tool/models';
import { TeamMemberCardComponent } from 'libs/ui/src/lib/team-member-card/team-member-card.component';
import { Observable } from 'rxjs';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { TeamMemberService } from '../services/team-members.service';

@Component({
  selector: 'manage-tool-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChildren('teamMembersCard') teamMembersCard: QueryList<
    TeamMemberCardComponent
  >;

  teamMembers: TeamMember[];
  private teamName: string;

  constructor(
    private teamMemberService: TeamMemberService,
    private dialog: MatDialog,
    private apolloService: ApolloService,
    private route: ActivatedRoute
  ) {
    this.teamMembersSubscription();
    this.queryParamsSubscription();
  }

  ngAfterViewInit(): void {
    this.teamMembersCard.changes.subscribe(
      (teamMembersCard: QueryList<TeamMemberCardComponent>) => {
        this.updateTeamMembers(teamMembersCard);
      }
    );
  }

  openAddMemberDialog(): void {
    this.dialog.open(AddMemberDialogComponent);
  }

  deleteMember(name: string): void {
    this.teamMemberService.removeTeamMember(name);
  }

  getTeamMembersNames(): Observable<TeamMembers> {
    return this.teamMemberService.teamMembersNames();
  }

  updateTeamMembers(
    teamMembersCard?: QueryList<TeamMemberCardComponent>
  ): void {
    const teamMembers: TeamMembers = {
      teamName: this.teamName,
      teamMembers: [],
    };

    if (!teamMembersCard) {
      teamMembersCard = this.teamMembersCard;
    }

    teamMembersCard.forEach((teamMember: TeamMemberCardComponent) => {
      teamMembers.teamMembers.push({
        name: teamMember.name,
        goals: teamMember.goals.controls.map(
          (control: AbstractControl) => control.value
        ),
        finishedGoals: teamMember.finishedGoals.controls.map(
          (control: AbstractControl) => control.value
        ),
      });
    });

    this.apolloService.updateTeamMembers(teamMembers);
  }

  private teamMembersSubscription(): void {
    this.getTeamMembersNames().subscribe((teamMembers: TeamMembers) => {
      this.teamMembers = teamMembers.teamMembers;
    });
  }

  private queryParamsSubscription(): void {
    this.route.queryParams.subscribe((params: { team: string }) => {
      this.teamName = params.team;
    });
  }
}
