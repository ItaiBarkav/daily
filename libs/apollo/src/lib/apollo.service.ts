import { Injectable } from '@angular/core';
import { TeamSchedule } from '@manage-tool/models';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private readonly GET_TEAM_SCHEDULE = gql`
    query getTeamSchedule {
      getTeamSchedule {
        teamName
        startDate
        endDate
        sprintDuration
        sprintNumber
        quarter
      }
    }
  `;

  private readonly UPDATE_TEAM_SCHEDULE = gql`
    mutation updateTeamSchedule($teamSchedule: InputTeamSchedule!) {
      updateTeamSchedule(teamSchedule: $teamSchedule)
    }
  `;

  private teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);

  constructor(private apollo: Apollo) {}

  teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.value;
  }

  changeTeamSchedule(teamSchedule: TeamSchedule): void {
    this.teamSchedule$.next(teamSchedule);
  }

  getTeamSchedule(): Observable<TeamSchedule> {
    let teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);

    this.apollo
      .query({
        query: this.GET_TEAM_SCHEDULE,
      })
      .subscribe((teamSchedule: any) => {
        teamSchedule$.next(
          JSON.parse(JSON.stringify(teamSchedule.data.getTeamSchedule))
        );
      });

    return teamSchedule$.asObservable();
  }

  updateTeamSchedule(teamSchedule: TeamSchedule): void {
    this.apollo
      .mutate({
        mutation: this.UPDATE_TEAM_SCHEDULE,
        variables: {
          teamSchedule: teamSchedule,
        },
      })
      .subscribe();

    this.teamSchedule$.next(teamSchedule);
  }
}
