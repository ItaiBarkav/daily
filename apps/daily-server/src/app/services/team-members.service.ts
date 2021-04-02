import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from 'typedi';
import { TeamMembers } from '../schemas/teamMembers';

@Injectable({
  providedIn: 'root',
})
@Service()
export class TeamMembersService {
  private teamMembers$ = new BehaviorSubject<TeamMembers>(null);

  constructor() {}

  teamMembers(): Observable<TeamMembers> {
    return this.teamMembers$.asObservable();
  }

  teamMembersValue(): TeamMembers {
    return this.teamMembers$.getValue();
  }

  updateTeamMembers(teamMembers: TeamMembers): boolean {
    try {
      const currentTeamMembers = this.teamMembersValue();

      this.teamMembers$.next({
        teamName: teamMembers.teamName ?? currentTeamMembers.teamName,
        teamMembers: teamMembers.teamMembers ?? currentTeamMembers.teamMembers,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
