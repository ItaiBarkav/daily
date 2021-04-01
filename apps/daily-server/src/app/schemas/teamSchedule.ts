import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class TeamSchedule {
  @Field({ nullable: true })
  teamName: string;

  @Field({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  endDate: Date;

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
  startDate: Date;

  @Field({ nullable: true })
  endDate: Date;

  @Field(() => Int, { nullable: true })
  sprintDuration: number;

  @Field(() => Int, { nullable: true })
  sprintNumber: number;

  @Field(() => Int, { nullable: true })
  quarter: number;
}
