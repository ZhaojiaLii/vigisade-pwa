import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createDangerousSituation, createDangerousSituationFail, createDangerousSituationSuccess } from './dangerous.action';
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
    ofType(createDangerousSituation),
    switchMap(action => {
      return this.dangerousApiService.postDangerous(action.dangerousSituation).pipe(
        map(() => createDangerousSituationSuccess()),
        catchError(error => of(createDangerousSituationFail({error: error.message}))),
      );
    })
  ));
}
