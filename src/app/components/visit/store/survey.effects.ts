import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { SurveyApiService } from '../services/survey-api.service';
import {
  createResult,
  createResultFail,
  createResultSuccess,
  getResults,
  getResultsFail,
  getResultsSuccess,
  loadResult,
  loadResultFail,
  loadResultSuccess,
  loadSurvey,
  loadSurveyFail,
  loadSurveySuccess,
  updateResult,
  updateResultFail,
  updateResultSuccess
} from './survey.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SurveyEffects {

  constructor(
    private actions$: Actions,
    private surveyApi: SurveyApiService,
  ) {}

  @Effect()
  loadSurvey$ = createEffect(() => this.actions$.pipe(
    ofType(loadSurvey),
    switchMap(() => {
      return this.surveyApi.getSurvey().pipe(
        map(survey => loadSurveySuccess({survey})),
        catchError(error => of(loadSurveyFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  getResults$ = createEffect(() => this.actions$.pipe(
    ofType(getResults),
    switchMap(() => {
      return this.surveyApi.getResults().pipe(
        map(results => getResultsSuccess({results})),
        catchError(error => of(getResultsFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  loadResult$ = createEffect(() => this.actions$.pipe(
    ofType(loadResult),
    switchMap(action => {
      return this.surveyApi.getResult(action.id).pipe(
        map(result => loadResultSuccess({result})),
        catchError(error => of(loadResultFail({error: error.message}))),
      );
    })
  ));

  @Effect()
    createResult$ = createEffect(() => this.actions$.pipe(
        ofType(createResult),
        switchMap(action => {
            return this.surveyApi.createResult(action.createResultPayload).pipe(
                map(status => createResultSuccess({status})),
                catchError(error => of(createResultFail({error: error.message}))),
            );
        })
    ));

    @Effect()
    updateResult$ = createEffect(() => this.actions$.pipe(
        ofType(updateResult),
        switchMap(action => {
            return this.surveyApi.updateResult(action.updateResultPayload).pipe(
                map(status => updateResultSuccess({status})),
                catchError(error => of(updateResultFail({error: error.message}))),
            );
        })
    ));
}
