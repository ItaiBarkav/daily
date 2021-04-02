import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { InputTeamMembers, TeamMembers } from '../schemas/teamMembers';
import { TeamMembersService } from '../services/team-members.service';

@Service()
@Resolver(TeamMembers)
export class TeamMembersResolver {
  constructor(private teamMembersService: TeamMembersService) {}

  @Query(() => TeamMembers, { nullable: true })
  getTeamMembers(): TeamMembers {
    const teamMembers = this.teamMembersService.teamMembersValue();
    console.log('Get team members - ' + JSON.stringify(teamMembers));

    return teamMembers;
  }

  @Mutation(() => Boolean)
  updateTeamMembers(
    @Arg('teamMembers') teamMembers: InputTeamMembers
  ): boolean {
    console.log('Update team members to - ' + JSON.stringify(teamMembers));

    return this.teamMembersService.updateTeamMembers(teamMembers);
  }
}
