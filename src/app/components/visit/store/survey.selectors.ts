import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SurveyState } from './survey.state';
import { getUser } from '../../profile/store/profile.selector';
import { User } from '../../profile/interfaces/user';
import { Survey } from '../interfaces/survey.interface';

export const getSurveyState = createFeatureSelector<SurveyState>('survey');

export const getSurveys = createSelector(
  getSurveyState,
  (state: SurveyState) => {
    return state.surveys;
  }
);

export const getSelectedCategoryId = createSelector(
  getSurveyState,
  (state: SurveyState) => state.layout.selectedCategory,
);

export const getSurveyOfUser = createSelector(
  getSurveyState,
  getUser,
  (state: SurveyState, user: User) => {
    if (!user || !user.directionId) {
      return null;
    }

    const surveyOfUser = state.surveys
      .find(survey => survey.directionId === user.directionId);

    return surveyOfUser || null;
  },
);

export const getSurveySelectedCategory = createSelector(
  getSurveyOfUser,
  getSelectedCategoryId,
  (survey: Survey, selectedId: number) => {
    if (!selectedId || !survey || !survey.categories) {
      return null;
    }

    const surveyCategory = survey.categories
      .find(category => category.id === selectedId);

    return surveyCategory || null;
  }
);
