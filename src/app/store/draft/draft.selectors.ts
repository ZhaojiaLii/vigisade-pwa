import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DraftState } from './draft.state';
import { getUser } from '../../components/profile/store/profile.selector';
import { getSurveyOfUser } from '../../components/survey/store/survey.selectors';
import { Survey } from '../../components/survey/interfaces/getSurveys/survey.interface';
import { User } from '../../components/profile/interfaces/user';

export const getDraftState = createFeatureSelector<DraftState>('draft');

export const getSurveyDraft = createSelector(
  getDraftState,
  getUser,
  getSurveyOfUser,
  (state: DraftState, user: User, survey: Survey) => {
    if (!user || !survey) {
      return undefined;
    }

    if (
      !state.survey
      || user.id !== state.survey.ids.user
      || user.directionId !== state.survey.ids.direction
      || survey.surveyId !== state.survey.ids.survey
    ) {
      return null;
    }

    return state.survey;
  },
);
