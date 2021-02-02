import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private teamMembersNames$ = new BehaviorSubject<string[]>([]);

  constructor() {}

  teamMembersNames(): Observable<string[]> {
    return this.teamMembersNames$;
  }

  addTeamMember(name: string): void {
    this.teamMembersNames$.next([...this.teamMembersNames$.value, name]);
  }

  removeTeamMember(name: string): void {
    this.teamMembersNames$.next(
      this.teamMembersNames$.value.filter(
        (MemberName: string) => MemberName !== name
      )
    );
  }
}
