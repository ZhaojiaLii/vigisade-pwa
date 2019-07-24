import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CorrectionState } from './correction.states';
import { getSurveys } from '../../visit/store/survey.selectors';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';

export const getCorrectionState = createFeatureSelector<CorrectionState>('correction');

export const getCorrection = createSelector(
  getCorrectionState,
  (state: CorrectionState) => state.correctiveAction,
);

export const getCorrectionSurvey = createSelector(
  getCorrection,
  getSurveys,
  (corrections: Correction[], surveys: Survey[]) => {
    const allSurvey = [];
    allSurvey.push(surveys);
    let correctionSurvey;
    if (corrections !== null) {
      correctionSurvey = allSurvey.find(survey => survey.surveyId === corrections[0].survey_id);
    }
    return correctionSurvey || null;
  }
);


export const getCorrectionCategory = createSelector(
  getCorrection,
  getSurveys,
  (corrections: Correction[], surveys: Survey[]) => {
    let correctionCategory;
    const categories = [];
    for (const survey of surveys) {
      const allCategories = survey.surveyCategories;
      if (corrections !== null) {
        for (const correction of corrections) {
          correctionCategory = allCategories.find(category => category.surveyCategoryId === correction.category_id);
          if (!categories.includes(correctionCategory)) {
            categories.push(correctionCategory);
          }
        }
      }
    }
    return categories || null;
  }
);

export const getCorrectionQuestion = createSelector(
  getCorrection,
  getCorrectionCategory,
  (corrections: Correction[], categories: any) => {
    const questions = [];
    let correctionQuestion;
    if (corrections === null) {
      return;
    }
    for (const correction of corrections) {
      for (const category of categories) {
        correctionQuestion = category.surveyQuestion.find(question => question.surveyQuestionId === correction.question_id);
        if (correctionQuestion && !questions.includes(correctionQuestion)) {
          questions.push(correctionQuestion);
        }
      }
    }
    return questions || null;
  }
);
