import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadUser,
  loadUserFail,
  loadUserSuccess,
  updateUser,
  updateUserFail,
  updateUserSuccess
} from './profile.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileApiService } from '../services/profile-api.service';


@Injectable()
export class ProfileEffects {
  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(loadUser),
    switchMap(() => {
      return this.profileApi.getUser().pipe(
        map(user => loadUserSuccess({user})),
        catchError(error => of(loadUserFail({error: error.message}))),
      );
    })
  ));
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    switchMap(action => {
      return this.profileApi.updateUser(action.updateUserPayload).pipe(
        map(status => updateUserSuccess({status})),
        catchError(error => of(updateUserFail({error: error.message}))),
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private profileApi: ProfileApiService,
  ) {}
}
