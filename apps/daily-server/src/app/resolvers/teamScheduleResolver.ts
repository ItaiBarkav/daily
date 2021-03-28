import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InputTeamSchedule, TeamSchedule } from '../schemas/teamSchedule';
import { TeamScheduleService } from '../services/team-schedule.service';

@Service()
@Resolver(TeamSchedule)
export class TeamScheduleResolver {
  constructor(private teamScheduleService: TeamScheduleService) {}

  @Query(() => TeamSchedule)
  getTeamSchedule(): TeamSchedule {
    return this.teamScheduleService.teamScheduleValue();
  }

  @Mutation(() => Boolean)
  updateTeamSchedule(
    @Arg('teamSchedule') teamSchedule: InputTeamSchedule
  ): boolean {
    this.teamScheduleService.updateTeamSchedule({
      teamName: teamSchedule.teamName,
      startDate: teamSchedule.startDate,
      endDate: teamSchedule.endDate,
      sprintDuration: teamSchedule.sprintDuration,
      sprintNumber: teamSchedule.sprintNumber,
      quarter: teamSchedule.quarter,
    });
    return true;
  }
}
