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

  get teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.getValue();
  }

  updateTeamSchedule(teamSchedule: TeamSchedule): void {
    this.teamSchedule$.next(teamSchedule);
  }
}
