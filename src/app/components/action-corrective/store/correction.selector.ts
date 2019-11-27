import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllUsersState, CorrectionState } from './correction.states';
import { getSurveyOfUser, getSurveys } from '../../survey/store/survey.selectors';
import { Survey } from '../../survey/interfaces/getSurveys/survey.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { getHistory, getSelectedResult } from '../../history/store/history.selectors';
import { Result } from '../../survey/interfaces/results/result.interface';
import { getUser } from '../../profile/store/profile.selector';
import { User } from '../../profile/interfaces/user';
import { ATraiterSearch } from '../../a-traiter/interfaces/a-traiter.search';
import * as moment from 'moment';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';

export const getCorrectionState = createFeatureSelector<CorrectionState>('correction');
export const getAllUsersState = createFeatureSelector<AllUsersState>('users');

export const getRoutingState = createSelector(
  getCorrectionState,
  (state: CorrectionState) => {
    if (state) {
      return state.fromHomepage;
    }
  }
);

export const getCorrection = createSelector(
  getCorrectionState,
  getSurveyOfUser,
  (state: CorrectionState, survey: Survey) => {
    if (!state) {
      return null;
    }
    if (state.correctiveAction && survey) {
      return state.correctiveAction.filter(correction => correction.survey_id === survey.surveyId);
    }
  },
);

export const getDangerousCorrection = createSelector(
  getCorrectionState,
  (state: CorrectionState) => {
    if (state.correctiveAction) {
      return state.correctiveAction.filter(correction => correction.survey_id === null);
    }
  }
);

export const getAllUsers = createSelector(
  getAllUsersState,
  (state: AllUsersState) => {
    return state.users;
  }
);

// export const getCorrectionResults = createSelector(
//   getCorrection,
//   getResults,
//   (corrections: Correction[], userResult: Result[]) => {
//     const resultsArray = [];
//     if (corrections !== null && userResult !== null) {
//       for (const correction of corrections) {
//         const correctionResult = userResult.find(result => result.resultId === correction.result_id);
//         if (!resultsArray.includes(correctionResult)) {
//           resultsArray.push(correctionResult);
//         }
//       }
//     }
//     return resultsArray || null;
//   }
// );

export const getUserMobileCorrection = createSelector(
  getCorrection,
  getDangerousCorrection,
  getUser,
  (results: Correction[], dangerous: Correction[], user: User) => {

    if (!user || !results || !dangerous) {
      return [];
    }
    const correctionDangerous = [...results, ...dangerous];
    return correctionDangerous.filter(result => {
      return (result.user_id === user.id && result.status === 'A traiter');
    });
  }
);

export const getMobileATraiterByDate = createSelector(
  getUserMobileCorrection,
  getHistory,
  (corrections: Correction[],  history: GetResult) => {
    if (corrections && history) {
      corrections.sort((a, b) => {
        const dateA = a.date;
        const dateB = b.date;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
    }
    return corrections;
  }
);

export const getCorrectionResult = createSelector(
  getCorrection,
  getSelectedResult,
  (corrections: Correction[], results: Result) => {
    if (corrections && results) {
      return results;
    }
  }
);

export const getSearchParams = createSelector(
  getCorrectionState,
  (state: CorrectionState) => state.search,
);

export const getFilteredUserAtraiter = createSelector(
  getCorrection,
  getSearchParams,
  getDangerousCorrection,
  getHistory,
  (corrections: Correction[], searchParams: ATraiterSearch, dangerous: Correction[], history: GetResult) => {
    if (dangerous || corrections) {
      let all;
      if (dangerous && !corrections) {
        all = [...dangerous];
      } else if (dangerous && corrections) {
        all = [...corrections, ...dangerous];
      } else if (!dangerous && corrections) {
        all = [...corrections];
      }
      if (searchParams.areaId || searchParams.entityId) {
        return  corrections.filter(correction => {
          if (searchParams) {
            return (
                !searchParams.startDate
                || moment(correction.date).format('YYYY-MM-DD')
                >= moment(searchParams.startDate).format('YYYY-MM-DD')
              )
              && (
                !searchParams.endDate
                || moment(correction.date).format('YYYY-MM-DD')
                <= moment(searchParams.endDate).format('YYYY-MM-DD')
              )
              && (
                !searchParams.status
                || correction.status === searchParams.status || correction.status === 'Corrigé'
              )
              && (
                !searchParams.areaId
                || history.result.find(result => result.resultId === correction.result_id).resultArea === Number(searchParams.areaId)
              )
              && (
                !searchParams.entityId
                || history.result.find(result => result.resultId === correction.result_id).resultEntity === Number(searchParams.entityId)
              )
              && (
                !searchParams.responsible
                || correction.user_id === Number(searchParams.responsible)
              );
          } else {
            return correction;
          }
        });
      } else {
        return all.filter(correction => {
          if (searchParams) {
            return (
                !searchParams.startDate
                || moment(correction.date).format('YYYY-MM-DD')
                >= moment(searchParams.startDate).format('YYYY-MM-DD')
              )
              && (
                !searchParams.endDate
                || moment(correction.date).format('YYYY-MM-DD')
                <= moment(searchParams.endDate).format('YYYY-MM-DD')
              )
              && (
                !searchParams.status
                || correction.status === searchParams.status || correction.status === 'Corrigé'
              )
              && (
                !searchParams.responsible
                || correction.user_id === Number(searchParams.responsible)
              );
          } else {
            return correction;
          }
        });
      }
    }
  }
);

export const getDesktopATraiterByDate = createSelector(
  getFilteredUserAtraiter,
  getHistory,
  (corrections: Correction[],  history: GetResult) => {
    if (corrections && history) {
      if (corrections.length > 1) {
        const unfreezeCorrections = corrections.slice();
        unfreezeCorrections.sort((a, b) => {
          const dateA = a.date;
          const dateB = b.date;
          if (dateA > dateB) {
            return -1;
          }
          if (dateA < dateB) {
            return 1;
          }
          return 0;
        });
        return unfreezeCorrections;
      } else if (corrections.length === 1) {
        return corrections;
      } else {
        return [];
      }
    }
  }
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
    if (surveys) {
      for (const survey of surveys) {
        const allCategories = survey.surveyCategories;
        if (corrections) {
          for (const correction of corrections) {
            correctionCategory = allCategories.find(category => category.surveyCategoryId === correction.category_id);
            if (!categories.includes(correctionCategory) && correctionCategory ) {
              categories.push(correctionCategory);
            }
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
        if (category) {
          correctionQuestion = category.surveyQuestion.find(question => question.surveyQuestionId === correction.question_id);
          if (correctionQuestion && !questions.includes(correctionQuestion)) {
            questions.push(correctionQuestion);
          }
        }
      }
    }
    return questions || null;
  }
);
