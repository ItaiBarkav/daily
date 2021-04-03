import { Injectable } from '@angular/core';
import { TeamMembers, TeamSchedule } from '@manage-tool/models';
import { Apollo, gql, QueryRef } from 'apollo-angular';
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

  private readonly GET_TEAM_MEMBERS = gql`
    query getTeamMembers {
      getTeamMembers {
        teamName
        teamMembers {
          name
          goals
          finishedGoals
        }
      }
    }
  `;

  private readonly UPDATE_TEAM_MEMBERS = gql`
    mutation updateTeamMembers($teamMembers: InputTeamMembers!) {
      updateTeamMembers(teamMembers: $teamMembers)
    }
  `;

  private teamSchedule$ = new BehaviorSubject<TeamSchedule>(null);
  private teamMembers$ = new BehaviorSubject<TeamMembers>(null);
  private getTeamScheduleQueryRef = this.getTeamSchedule();
  private getTeamMembersQueryRef = this.getTeamMembers();

  constructor(private apollo: Apollo) {
    this.getTeamScheduleQuerySubscription();
    this.getTeamMembersQuerySubscription();
    this.updateSchedule();
  }

  teamSchedule(): Observable<TeamSchedule> {
    return this.teamSchedule$.asObservable();
  }

  teamScheduleValue(): TeamSchedule {
    return this.teamSchedule$.getValue();
  }

  teamMembers(): Observable<TeamMembers> {
    return this.teamMembers$.asObservable();
  }

  teamMembersValue(): TeamMembers {
    return this.teamMembers$.getValue();
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

    this.getTeamScheduleQueryRef.refetch();
  }

  updateTeamMembers(teamMembers: TeamMembers): void {
    this.apollo
      .mutate({
        mutation: this.UPDATE_TEAM_MEMBERS,
        variables: {
          teamMembers: teamMembers,
        },
      })
      .subscribe();
  }

  private getTeamSchedule(): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: this.GET_TEAM_SCHEDULE,
    });
  }

  private getTeamScheduleQuerySubscription(): void {
    this.getTeamScheduleQueryRef.valueChanges.subscribe(({ data }) => {
      this.teamSchedule$.next(data.getTeamSchedule);
    });
  }

  private getTeamMembers(): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: this.GET_TEAM_MEMBERS,
    });
  }

  private getTeamMembersQuerySubscription(): void {
    this.getTeamMembersQueryRef.valueChanges.subscribe(({ data }) => {
      this.teamMembers$.next(data.getTeamMembers);
    });
  }

  private updateSchedule(): void {
    setInterval(() => {
      if (
        this.teamScheduleValue() &&
        new Date().getDate() >
          new Date(this.teamScheduleValue().endDate).getDate()
      ) {
        const currentTeamSchedule = this.teamScheduleValue();
        const newStartDate = new Date(currentTeamSchedule.endDate);
        const newEndDate = new Date(currentTeamSchedule.endDate);

        this.updateTeamSchedule({
          teamName: currentTeamSchedule.teamName,
          startDate: newStartDate.toDateString(),
          endDate: this.updateEndDate(
            newEndDate,
            currentTeamSchedule.sprintDuration
          ),
          sprintDuration: currentTeamSchedule.sprintDuration,
          sprintNumber: currentTeamSchedule.sprintNumber + 1,
          quarter: currentTeamSchedule.quarter,
        });
      }
    }, 3600000);
  }

  private updateEndDate(newEndDate: Date, sprintDuration: number): string {
    newEndDate.setDate(newEndDate.getDate() + sprintDuration);
    return newEndDate.toDateString();
  }
}
