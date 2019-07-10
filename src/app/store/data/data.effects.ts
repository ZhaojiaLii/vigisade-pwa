import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataApiService } from '../../services/api/data-api.service';
import { loadData, loadDataFail, loadDataSuccess } from './data.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DataEffects {

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(loadData),
    switchMap(() => {
      return this.dataApi.getData().pipe(
        map(data => loadDataSuccess(data)),
        catchError(error => of(loadDataFail({error: error.message}))),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private dataApi: DataApiService,
  ) {}
}
