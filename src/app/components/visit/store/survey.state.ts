import { Survey } from '../interfaces/survey.interface';

export interface SurveyState {
  survey: Survey | null;
}

export const surveyInitialState = {
  survey: null,
};
