import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Service } from 'typedi';
import { TeamSchedule } from '../schemas/teamSchedule';

@Injectable({
  providedIn: 'root',
})
@Service()
export class TeamScheduleService {
  private teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);

  constructor() {}

  teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.getValue();
  }

  updateTeamSchedule(teamSchedule: TeamSchedule): boolean {
    try {
      const currentTeamSchedule = this.teamScheduleValue();

      this.teamSchedule$.next({
        teamName: teamSchedule.teamName ?? currentTeamSchedule.teamName,
        startDate: teamSchedule.startDate ?? currentTeamSchedule.startDate,
        endDate: teamSchedule.endDate ?? currentTeamSchedule.endDate,
        sprintDuration:
          teamSchedule.sprintDuration ?? currentTeamSchedule.sprintDuration,
        sprintNumber:
          teamSchedule.sprintNumber ?? currentTeamSchedule.sprintNumber,
        quarter: teamSchedule.quarter ?? currentTeamSchedule.quarter,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
