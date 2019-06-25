import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SurveyApiService } from '../services/survey-api.service';
import { getSurvey, getSurveyFail, getSurveySuccess } from './survey.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SurveyEffects {

  constructor(
    private actions$: Actions,
    private surveyApi: SurveyApiService,
  ) {}

  getSurvey$ = createEffect(() => this.actions$.pipe(
    ofType(getSurvey),
    switchMap(action => {
      return this.surveyApi.getSurvey().pipe(
        map(survey => getSurveySuccess({survey})),
        catchError(error => of(getSurveyFail({error: error.message}))),
      );
    })
  ));
}
