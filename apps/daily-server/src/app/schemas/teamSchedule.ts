import { Field, InputType, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class TeamSchedule {
  @Field()
  teamName: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => Int)
  sprintDuration: number;

  @Field(() => Int)
  sprintNumber: number;

  @Field(() => Int)
  quarter: number;
}

@InputType()
export class InputTeamSchedule {
  @Field()
  teamName: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => Int)
  sprintDuration: number;

  @Field(() => Int)
  sprintNumber: number;

  @Field(() => Int)
  quarter: number;
}
