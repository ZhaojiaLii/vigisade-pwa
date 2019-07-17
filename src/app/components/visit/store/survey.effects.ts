import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SurveyApiService } from '../services/survey-api.service';
import { createResult, createResultFail, createResultSuccess, loadSurveys, loadSurveysFail, loadSurveysSuccess, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SurveyEffects {

  constructor(
    private actions$: Actions,
    private surveyApi: SurveyApiService,
  ) {}

  loadSurveys$ = createEffect(() => this.actions$.pipe(
    ofType(loadSurveys),
    switchMap(() => {
      return this.surveyApi.getSurveys().pipe(
        map(surveys => loadSurveysSuccess({surveys})),
        catchError(error => of(loadSurveysFail({error: error.message}))),
      );
    })
  ));
  createResult$ = createEffect(() => this.actions$.pipe(
      ofType(createResult),
      switchMap(action => {
          return this.surveyApi.createResult(action.createResultPayload).pipe(
              map(status => createResultSuccess({status})),
              catchError(error => of(createResultFail({error: error.message}))),
          );
      })
  ));

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
