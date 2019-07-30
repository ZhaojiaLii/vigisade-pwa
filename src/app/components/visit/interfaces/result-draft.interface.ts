export interface ResultDraft {
  main: {
    entity: string;
    place: string;
    client: string;
    date: string;
  };
  teamMembers: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
  }[];
  questions: {
    id: string;
    teamMemberId: string;
    selection: string;
    comment: string;
    photo: string;
  }[];
  bestPractice: {
    selection: string;
    type: string;
    comment: string;
    photo: string;
  };
}
