import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class TeamSchedule {
  @Field({ nullable: true })
  teamName: string;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;

  @Field(() => Int, { nullable: true })
  sprintDuration: number;

  @Field(() => Int, { nullable: true })
  sprintNumber: number;

  @Field(() => Int, { nullable: true })
  quarter: number;
}

@InputType()
export class InputTeamSchedule {
  @Field({ nullable: true })
  teamName: string;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;

  @Field(() => Int, { nullable: true })
  sprintDuration: number;

  @Field(() => Int, { nullable: true })
  sprintNumber: number;

  @Field(() => Int, { nullable: true })
  quarter: number;
}
