import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { getUser, getUserFail, getUserSuccess } from './profile.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileApiService } from '../services/profile-api.service';


@Injectable()
export class ProfileEffects {

  constructor(
    private actions$: Actions,
    private profileService: ProfileApiService,
  ) {}

  @Effect()
  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(getUser),
    switchMap(() => {
      return this.profileService.getUser().pipe(
        map(user => getUserSuccess({user})),
        catchError(error => of(getUserFail({error: error.message}))),
      );
    })
  ));

}
