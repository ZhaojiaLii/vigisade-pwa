import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { SurveyApiService } from '../services/survey-api.service';
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
  getSurvey$ = createEffect(() => this.actions$.pipe(
    ofType(getSurvey),
    switchMap(action => {
      return this.surveyApi.getSurvey().pipe(
        map(survey => getSurveySuccess({survey})),
        catchError(error => of(getSurveyFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  getResults$ = createEffect(() => this.actions$.pipe(
    ofType(getResults),
    switchMap(action => {
      return this.surveyApi.getResults().pipe(
        map(results => getResultsSuccess({results})),
        catchError(error => of(getResultsFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  getResult$ = createEffect(() => this.actions$.pipe(
    ofType(getResult),
    switchMap(action => {
      return this.surveyApi.getResult().pipe(
        map(result => getResultSuccess({result})),
        catchError(error => of(getResultFail({error: error.message}))),
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
