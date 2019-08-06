import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from './history.state';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { getSurveys } from '../../visit/store/survey.selectors';
import { getAreas, getEntities } from '../../../store/data/data.selectors';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { Question } from '../../visit/interfaces/getSurveys/question.interface';
import { ResultQuestion } from '../../visit/interfaces/results/result-question.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { getUser } from '../../profile/store/profile.selector';
import { User } from '../../profile/interfaces/user';
import { ROLES } from '../../../data/user.helpers';
import { HistorySearch } from '../interfaces/history-search.interface';
import { HistoryResult } from '../../visit/interfaces/getResultInterface/history-result.interface';
import { Result } from '../../visit/interfaces/results/result.interface';
import * as moment from 'moment';
import 'moment/min/locales';

export const getHistoryState = createFeatureSelector<HistoryState>('history');

export const getHistory = createSelector(
  getHistoryState,
  (state: HistoryState) => state.history,
);

export const getSearchParams = createSelector(
  getHistoryState,
  (state: HistoryState) => state.search,
);

export const getUserHistory = createSelector(
  getHistory,
  getUser,
  (history: GetResult, user: User) => {
    if (!user || !history || !history.result) {
      return [];
    }

    return history.result
      .filter(result => result.resultUserId === user.id);
  }
);

/**
 * Gets visible history according to the user role.
 */
export const getUserHistoryByRole = createSelector(
  getHistory,
  getUser,
  (history: GetResult, user: User) => {
    if (!user || !history || !history.result) {
      return [];
    }

    return history.result.filter(result => {
      if (user.roles.includes(ROLES.admin)) {
        return result.resultDirection === user.directionId;
      } else if (user.roles.includes(ROLES.manager)) {
        return result.resultEntity === user.entityId;
      } else {
        return result.resultUserId === user.id;
      }
    });
  }
);

export const getFilteredUserHistory = createSelector(
  getUserHistoryByRole,
  getSearchParams,
  (results: HistoryResult[], searchParams: HistorySearch) => {
    if (!results || !searchParams) {
      return results;
    }

    return results.filter(result => {
      return (
          !searchParams.startDate
          || result.resultDate >= moment(searchParams.startDate).format('YYYY-MM-DD')
        )
        && (
          !searchParams.endDate
          || result.resultDate <= moment(searchParams.endDate).format('YYYY-MM-DD')
        )
        && (
          !searchParams.areaId
          || result.resultArea === Number(searchParams.areaId)
        )
        && (
          !searchParams.entityId
          || result.resultEntity === Number(searchParams.entityId)
        )
        && (
          !searchParams.userId
          || result.resultUserId === Number(searchParams.userId)
        );
    });
  }
);

export const getResult = createSelector(
  getHistoryState,
  (state: HistoryState) => state.results,
);

export const getSelectedResult = createSelector(
  getHistoryState,
  (state: HistoryState) => {
    if (!state.layout.selectedResult) {
      return null;
    }
    const result = state.results
      .find(r => r.resultId === state.layout.selectedResult);

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
    const resultSurvey = surveys.find(survey => survey.surveyId === result.resultSurveyId);
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
    const resultEntity = entities.find(entity => entity.id === result.resultEntityId);
    return resultEntity || null;
  }
);

export const getSelectedResultArea = createSelector(
  getSelectedResult,
  getAreas,
  (result: Result, areas: Area[]) => {
    if (!result) {
      return null;
    }
    const resultArea = areas.find(area => area.id === result.resultAreaId);
    return resultArea || null;
  }
);

export const getSelectedResultBestPractice = createSelector(
  getSelectedResult,
  getSurveys,
  (result: Result, survey: Survey[]) => {
    if (result !== null && survey !== null) {
      const resultSurvey = survey.find(sur => sur.surveyId === result.resultSurveyId);
      const resultBestPractice = {
        resultBestPracticeDone: result.resultBestPracticeDone,
        resultBestPracticeComment: result.resultBestPracticeComment,
        resultBestPracticePhoto: result.resultBestPracticePhoto,
        surveyTranslationBestPracticeHelp: resultSurvey.bestPracticeTranslation.surveyTranslationBestPracticeHelp,
        surveyTranslationBestPracticeLabel: resultSurvey.bestPracticeTranslation.surveyTranslationBestPracticeLabel,
      };
      return resultBestPractice || null;
    } else {
      return ;
    }
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
      const question = result.resultQuestion
        .find((q: ResultQuestion) => q.resultQuestionId === categoryQuestion.surveyQuestionId);
      return {
        ...question,
        question: categoryQuestion,
      };
    });
  }
);
