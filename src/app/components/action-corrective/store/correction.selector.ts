import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CorrectionState } from './correction.states';
import { getSurveys } from '../../visit/store/survey.selectors';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { GetCorrection } from '../interfaces/getCorrection/getCorrection.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';

export const getCorrectionState = createFeatureSelector<CorrectionState>('correction');

export const getCorrection = createSelector(
  getCorrectionState,
  (state: CorrectionState) => state.correction,
);

export const getCorrectionSurvey = createSelector(
  getCorrection,
  getSurveys,
  (corrections: GetCorrection, surveys: Survey[]) => {
    const allSurvey = [];
    allSurvey.push(surveys);
    let correctionSurvey;
    // @ts-ignore
    for (const correction of corrections) {
      correctionSurvey = allSurvey.find(survey => survey.surveyId === correction.survey_id);
    }
    return correctionSurvey || null;
  }
);

export const getCorrectionCategory = createSelector(
  getCorrection,
  getSurveys,
  (corrections: GetCorrection, surveys: Survey[]) => {
    const allSurvey = [];
    allSurvey.push(surveys);
    let correctionSurvey;
    // @ts-ignore
    for (const correction of corrections) {
      correctionSurvey = allSurvey.find(survey => survey.surveyCategories === correction.category_id);
    }
    return correctionSurvey || null;
  }
);

export const getCorrectionQuestion = createSelector(
  getCorrection,
  getCorrectionCategory,
  (corrections: GetCorrection, categories: Category) => {
    console.log(categories);
    const allCategories = [];
    allCategories.push(categories);
    let correctionQuestion;
    // @ts-ignore
    for (const correction of corrections) {
      correctionQuestion = allCategories.find(category => category.surveyQuestion === correction.category_id);
    }
    return correctionQuestion || null;
  }
);
