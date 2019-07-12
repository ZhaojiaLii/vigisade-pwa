import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { loadUser, loadUserFail, loadUserSuccess } from './profile.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileApiService } from '../services/profile-api.service';


@Injectable()
export class ProfileEffects {

  @Effect()
  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap(() => {
      return this.profileApi.getUser().pipe(
        map(user => loadUserSuccess({user})),
        catchError(error => of(loadUserFail({error: error.message}))),
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private profileApi: ProfileApiService,
  ) {}
}
