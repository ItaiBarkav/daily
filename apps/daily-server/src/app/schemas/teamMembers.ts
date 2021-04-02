import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class TeamMembers {
  @Field({ nullable: true })
  teamName: string;

  @Field((type) => [TeamMember], { nullable: 'itemsAndList' })
  teamMembers: TeamMember[];
}

@ObjectType()
export class TeamMember {
  @Field({ nullable: true })
  name: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  goals: string[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  finishedGoals: string[];
}

@InputType()
export class InputTeamMembers {
  @Field({ nullable: true })
  teamName: string;

  @Field((type) => [InputTeamMember], { nullable: 'itemsAndList' })
  teamMembers: InputTeamMember[];
}

@InputType()
export class InputTeamMember {
  @Field({ nullable: true })
  name: string;

  @Field((type) => [String], { nullable: 'itemsAndList' })
  goals: string[];

  @Field((type) => [String], { nullable: 'itemsAndList' })
  finishedGoals: string[];
}
