import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history.state';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { getSurveys } from '../../visit/store/survey.selectors';
import { getEntities } from '../../../store/data/data.selectors';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { Question } from '../../visit/interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../interfaces/result-question.interface';

export const getHistoryState = createFeatureSelector<HistoryState>('history');

export const getHistory = createSelector(
  getHistoryState,
  (state: HistoryState) => state.history,
);

export const getResult = createSelector(
  getHistoryState,
  (state: HistoryState) => state.results[0],
);

export const getSelectedResult = createSelector(
  getHistoryState,
  (state: HistoryState) => {
    if (!state.layout.selectedResult) {
      return null;
    }

    const result = state.results
      .find(r => r.id === state.layout.selectedResult);

    return result || null;
  },
);

export const getSelectedResultSurvey = createSelector(
  getSelectedResult,
  getSurveys,
  (result: Result, surveys: Survey[]) => {
    if (!result) {
      return null;
    }

    const resultSurvey = surveys.find(survey => survey.surveyId === result.surveyId);

    return resultSurvey || null;
  }
);

export const getSelectedResultEntity = createSelector(
  getSelectedResult,
  getEntities,
  (result: Result, entities: Entity[]) => {
    if (!result) {
      return null;
    }

    const resultEntity = entities.find(entity => entity.id === result.entityId);

    return resultEntity || null;
  }
);

export const getSelectedResultCategory = createSelector(
  getSelectedResultSurvey,
  getHistoryState,
  (survey: Survey, state: HistoryState) => {
    if (!state.layout.selectedCategory || !survey || !survey.surveyCategories) {
      return null;
    }

    const surveyCategory = survey.surveyCategories
      .find(category => category.surveyCategoryId === state.layout.selectedCategory);

    return surveyCategory || null;
  }
);

export const getSelectedResultQuestions = createSelector(
  getSelectedResultCategory,
  getSelectedResult,
  (category: Category, result: Result) => {
    return category.surveyQuestion.map((categoryQuestion: Question) => {
      const question = result.questions
        .find((q: ResultQuestion) => q.questionId === categoryQuestion.surveyQuestionId);

      return {
        ...question,
        question: categoryQuestion,
      };
    });
  }
);
