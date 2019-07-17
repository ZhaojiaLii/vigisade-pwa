import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadHistory, loadHistoryFail, loadHistorySuccess, loadResult, loadResultFail, loadResultSuccess } from './history.actions';
import { HistoryApiService } from '../services/history-api.service';
import { of } from 'rxjs';

@Injectable()
export class HistoryEffects {

  constructor(
    private actions$: Actions,
    private api: HistoryApiService,
  ) {}

  loadHistory$ = createEffect(() => this.actions$.pipe(
    ofType(loadHistory),
    switchMap(() => {
      return this.api.getHistory().pipe(
        map(history => loadHistorySuccess({history})),
        catchError(error => of(loadHistoryFail({error: error.message}))),
      );
    })
  ));

  loadResult$ = createEffect(() => this.actions$.pipe(
    ofType(loadResult),
    switchMap(action => {
      return this.api.getResult(action.id).pipe(
        map(result => loadResultSuccess({result})),
        catchError(error => of(loadResultFail({error: error.message}))),
      );
    })
  ));
}
