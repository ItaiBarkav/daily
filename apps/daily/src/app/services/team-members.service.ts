import { Injectable } from '@angular/core';
import { ApolloService } from '@manage-tool/apollo';
import { TeamMember, TeamMembers } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private teamMembers$ = new BehaviorSubject<TeamMembers>({
    teamName: '',
    teamMembers: [],
  });
  private teamName: string;

  constructor(private apolloService: ApolloService) {
    this.teamMembersSubscription();
  }

  private teamMembersSubscription(): void {
    this.apolloService.teamMembers().subscribe((teamMembers: TeamMembers) => {
      if (teamMembers) {
        this.teamName = teamMembers.teamName;
        this.teamMembers$.next(teamMembers);
      }
    });
  }

  teamMembersNames(): Observable<TeamMembers> {
    return this.teamMembers$;
  }

  addTeamMember(name: string): void {
    this.teamMembers$.next(this.addNewTeamMember(name));
  }

  removeTeamMember(name: string): void {
    this.teamMembers$.next(this.removeExistTeamMember(name));
  }

  private addNewTeamMember(name: string): TeamMembers {
    let teamMembers = [...this.teamMembers$.getValue().teamMembers];

    teamMembers.push({
      name: name,
      goals: [],
      finishedGoals: [],
    });

    return {
      teamName: this.teamName,
      teamMembers: teamMembers,
    };
  }

  private removeExistTeamMember(name: string): TeamMembers {
    let teamMembers = [...this.teamMembers$.getValue().teamMembers];

    teamMembers = this.teamMembers$
      .getValue()
      .teamMembers.filter((memberName: TeamMember) => memberName.name !== name);

    return {
      teamName: this.teamName,
      teamMembers: teamMembers,
    };
  }
}
