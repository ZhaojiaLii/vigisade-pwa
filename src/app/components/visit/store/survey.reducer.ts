import { createReducer, on } from '@ngrx/store';
import {
  createResultInitialState,
  getResultInitialState,
  getResultsInitialState,
  openMenuInitialState,
  surveyInitialState,
  updateResultInitialState
} from './survey.state';
import {
  createResult,
  createResultFail,
  createResultSuccess,
  getResult,
  getResultFail,
  getResults,
  getResultsFail,
  getResultsSuccess,
  getResultSuccess,
  getSurvey,
  getSurveyFail,
  getSurveySuccess,
  openMenu,
  updateResult,
  updateResultFail,
  updateResultSuccess
} from './survey.actions';

export const surveyReducer = createReducer(
  surveyInitialState,
  on(getSurvey, state => state),
  on(getSurveySuccess, (state, {survey}) => ({...state, survey})),
  on(getSurveyFail, state => state),
);

export const getResultsReducer = createReducer(
  getResultsInitialState,
  on(getResults, state => state),
  on(getResultsSuccess, (state, {results}) => ({...state, results})),
  on(getResultsFail, (state => state)),
);

export const getResultReducer = createReducer(
  getResultInitialState,
  on(getResult,  state => state),
  on(getResultSuccess, (state, {result}) => ({...state, result})),
  on(getResultFail, state => state),
);

export const createResultReducer = createReducer(
    createResultInitialState,
    on(createResult, state => state),
    on(createResultSuccess, (state, {status}) => ({...state, status})),
    on(createResultFail, state => state),
);

export const updateResultReducer = createReducer(
    updateResultInitialState,
    on(updateResult, state => state),
    on(updateResultSuccess, (state, {status}) => ({...state, status})),
    on(updateResultFail, state => state),
);

export const openMenuReducer = createReducer(
  openMenuInitialState,
  on(openMenu, state => state),
);
