import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createDangerous,
  createDangerousFail,
  createDangerousSuccess,
  loadDangerousType,
  loadDangerousTypeFail,
  loadDangerousTypeSuccess
} from './dangerous.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DangerousApiService } from '../services/dangerous-api.service';
import { of } from 'rxjs';

@Injectable()
export class DangerousEffects {

  constructor(
    private actions$: Actions,
    private dangerousApiService: DangerousApiService
  ) {}

  createDangerous$ = createEffect(() => this.actions$.pipe(
    ofType(createDangerous),
    switchMap(action => {
      return this.dangerousApiService.postDangerous(action.dangerousPayload).pipe(
        map(status => createDangerousSuccess({status})),
        catchError(error => of(createDangerousFail({error: error.message}))),
      );
    })
  ));

  getDangerousType$ = createEffect(() => this.actions$.pipe(
   ofType(loadDangerousType),
    switchMap(() => {
      return this.dangerousApiService.loadDangerousType().pipe(
        map(dangerousType => loadDangerousTypeSuccess({dangerousType})),
        catchError(error => of(loadDangerousTypeFail({error: error.message}))),
      );
    })
  ));
}
