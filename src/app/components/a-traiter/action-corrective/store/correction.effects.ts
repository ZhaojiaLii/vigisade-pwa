import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess,
  getCorrection,
  getCorrectionFail,
  getCorrectionSuccess,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess
} from './correction.actions';
import {ActionCorrectiveApiService} from '../services/action-corrective-api.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CorrectionEffects {

  constructor(
    private actions$: Actions,
    private correctionApi: ActionCorrectiveApiService,
  ) {}

  @Effect()
  getCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(getCorrection),
    switchMap(() => {
      return this.correctionApi.getCorrection().pipe(
        map(correction => getCorrectionSuccess({correction})),
        catchError(error => of(getCorrectionFail({error: error.message}))),
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
