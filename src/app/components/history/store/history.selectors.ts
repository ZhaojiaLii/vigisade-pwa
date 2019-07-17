import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history.state';
import { Result } from '../../visit/interfaces/result.interface';
import { Survey } from '../../visit/interfaces/survey.interface';
import { getSurveys } from '../../visit/store/survey.selectors';
import { getEntities } from '../../../store/data/data.selectors';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../visit/interfaces/category.interface';
import { Question } from '../../visit/interfaces/question.interface';
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

    const resultSurvey = surveys.find(survey => survey.id === result.surveyId);

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
    if (!state.layout.selectedCategory || !survey || !survey.categories) {
      return null;
    }

    const surveyCategory = survey.categories
      .find(category => category.id === state.layout.selectedCategory);

    return surveyCategory || null;
  }
);

export const getSelectedResultQuestions = createSelector(
  getSelectedResultCategory,
  getSelectedResult,
  (category: Category, result: Result) => {
    return category.questions.map((categoryQuestion: Question) => {
      const question = result.questions
        .find((q: ResultQuestion) => q.questionId === categoryQuestion.id);

      return {
        ...question,
        question: categoryQuestion,
      };
    });
  }
);
