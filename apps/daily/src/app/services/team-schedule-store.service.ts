import { Injectable } from '@angular/core';
import { ApolloService } from '@manage-tool/apollo';
import { TeamSchedule } from '@manage-tool/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamScheduleStoreService {
  private teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);

  constructor(private apolloService: ApolloService) {
    this.updateSchedule();
    this.isLoginSubscribtion();
  }

  teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.value;
  }

  updateTeamSchedule(teamSchedule: TeamSchedule): void {
    this.updateApolloServer(teamSchedule);
    this.teamSchedule$.next(teamSchedule);
  }

  updateTeamScheduleFromSettings(teamSchedule: TeamSchedule): void {
    this.updateApolloServer(teamSchedule);
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

  private isLoginSubscribtion(): void {
    this.apolloService
      .getTeamSchedule()
      .subscribe((teamSchedule: TeamSchedule) => {
        if (teamSchedule) {
          this.teamSchedule$.next(teamSchedule);
        }
      });
  }

  private updateApolloServer(teamSchedule: TeamSchedule): void {
    if (!teamSchedule.teamName) {
      teamSchedule.teamName = this.teamScheduleValue().teamName;
    }
    this.apolloService.updateTeamSchedule(teamSchedule);
  }

  private updateSchedule(): void {
    setInterval(() => {
      if (
        this.teamScheduleValue() &&
        new Date().getDate() > this.teamScheduleValue().endDate.getDate()
      ) {
        const currentTeamSchedule = this.teamScheduleValue();
        const newStartDate = new Date(currentTeamSchedule.endDate);
        const newEndDate = new Date(currentTeamSchedule.endDate);

        this.teamSchedule$.next({
          teamName: currentTeamSchedule.teamName,
          startDate: newStartDate,
          endDate: this.updateEndDate(
            newEndDate,
            currentTeamSchedule.sprintDuration
          ),
          sprintDuration: currentTeamSchedule.sprintDuration,
          sprintNumber: ++currentTeamSchedule.sprintNumber,
          quarter: currentTeamSchedule.quarter,
        });
      }
    }, 3600000);
  }

  private updateEndDate(newEndDate: Date, sprintDuration: number): Date {
    newEndDate.setDate(newEndDate.getDate() + sprintDuration);
    return newEndDate;
  }
}
