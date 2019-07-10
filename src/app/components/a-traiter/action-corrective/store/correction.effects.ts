import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess,
  loadCorrection,
  loadCorrectionFail,
  loadCorrectionSuccess,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess
} from './correction.actions';
import { ActionCorrectiveApiService } from '../services/action-corrective-api.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getResult, getResultFail, getResultSuccess } from '../../../visit/store/survey.actions';

@Injectable()
export class CorrectionEffects {

  constructor(
    private actions$: Actions,
    private correctionApi: ActionCorrectiveApiService,
  ) {}

  @Effect()
  loadCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(loadCorrection),
    switchMap(() => {
      return this.correctionApi.loadCorrection().pipe(
        map(correction => loadCorrectionSuccess({correction})),
        catchError(error => of(loadCorrectionFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  loadResult$ = createEffect(() => this.actions$.pipe(
    ofType(getResult),
    switchMap(action => {
      return this.correctionApi.loadResult(action.id).pipe(
        map(result => getResultSuccess({result})),
        catchError(error => of(getResultFail({error: error.message})))
      );
    })
  ));

  @Effect()
  updateCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(updateCorrection),
    switchMap(action => {
      return this.correctionApi.updateCorrection(action.updateCorrectionPayload).pipe(
        map(status => updateCorrectionSuccess({status})),
        catchError(error => of(updateCorrectionFail({error: error.message}))),
      );
    })
  ));

  @Effect()
  createCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(createCorrection),
    switchMap( action => {
      return this.correctionApi.createCorrection(action.createCorrectionPayload).pipe(
        map(status => createCorrectionSuccess({status})),
        catchError(error => of(createCorrectionFail({error: error.message}))),
      );
    })
  ));
}
