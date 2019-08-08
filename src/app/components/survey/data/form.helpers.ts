import { Question } from '../interfaces/getSurveys/question.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getRandomId } from '../../../data/random.helpers';

export const buildQuestionForm = (question: Question, teamMemberId: string): FormGroup => {
  return new FormGroup({
    id: new FormControl(question.surveyQuestionId.toString()),
    teamMemberId: new FormControl(teamMemberId),
    selection: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(1)]),
    photo: new FormControl(''),
  });
};

export const buildTeamMemberForm = (): FormGroup => new FormGroup({
  id: new FormControl(getRandomId(), [Validators.required]),
  firstName: new FormControl('', [Validators.required]),
  lastName: new FormControl('', [Validators.required]),
  role: new FormControl('', [Validators.required]),
});
