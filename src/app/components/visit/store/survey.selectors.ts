import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SurveyState } from './survey.state';
import { getUser } from '../../profile/store/profile.selector';
import { User } from '../../profile/interfaces/user';
import { Survey } from '../interfaces/getSurveys/survey.interface';

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
  getSurveys,
  getUser,
  (surveys: Survey[], user: User) => {
    if (!user || !user.directionId || !surveys) {
      return null;
    }

    const surveyOfUser = surveys
      .find(survey => survey.surveyDirectionId === user.directionId);
    return surveyOfUser || null;
  },
);

export const getSurveySelectedCategory = createSelector(
  getSurveyOfUser,
  getSelectedCategoryId,
  (survey: Survey, selectedId: number) => {
    if (!selectedId || !survey || !survey.surveyCategories) {
      return null;
    }

    const surveyCategory = survey.surveyCategories
      .find(category => category.surveyCategoryId === selectedId);

    return surveyCategory || null;
  }
);
