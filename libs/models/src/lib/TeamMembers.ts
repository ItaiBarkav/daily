export interface TeamMembers {
  teamName: string;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  name: string;
  goals: string[];
  finishedGoals: string[];
}
