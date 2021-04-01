import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InputTeamSchedule, TeamSchedule } from '../schemas/teamSchedule';
import { TeamScheduleService } from '../services/team-schedule.service';

@Service()
@Resolver(TeamSchedule)
export class TeamScheduleResolver {
  constructor(private teamScheduleService: TeamScheduleService) {}

  @Query(() => TeamSchedule, { nullable: true })
  getTeamSchedule(): TeamSchedule {
    const teamSchedule = this.teamScheduleService.teamScheduleValue();
    console.log('Get team schedule - ' + JSON.stringify(teamSchedule));

    return teamSchedule;
  }

  @Mutation(() => Boolean)
  updateTeamSchedule(
    @Arg('teamSchedule') teamSchedule: InputTeamSchedule
  ): boolean {
    console.log('Update team schedule to - ' + JSON.stringify(teamSchedule));

    return this.teamScheduleService.updateTeamSchedule(teamSchedule);
  }
}
