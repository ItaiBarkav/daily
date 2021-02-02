import { Injectable } from '@angular/core';
import { TeamSchedule } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamScheduleStoreService {
  private teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);

  constructor() {}

  teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.value;
  }

  updateTeamScheduale(teamSchedule: TeamSchedule): void {
    this.teamSchedule$.next(teamSchedule);
  }
}
