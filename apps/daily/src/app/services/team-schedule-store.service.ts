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

  updateTeamSchedule(teamSchedule: TeamSchedule): void {
    this.teamSchedule$.next(teamSchedule);
  }

  updateTeamScheduleFromSettings(teamSchedule: TeamSchedule): void {
    const currentTeamSchedule = this.teamScheduleValue();

    this.teamSchedule$.next({
      teamName: currentTeamSchedule.teamName,
      startDate: teamSchedule.startDate ?? currentTeamSchedule.startDate,
      endDate: teamSchedule.endDate ?? currentTeamSchedule.endDate,
      sprintDuration:
        teamSchedule.sprintDuration ?? currentTeamSchedule.sprintDuration,
      sprintNumber:
        teamSchedule.sprintNumber ?? currentTeamSchedule.sprintNumber,
      quarter: teamSchedule.quarter ?? currentTeamSchedule.quarter,
    });
  }
}
