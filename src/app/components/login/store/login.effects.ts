import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { LoginApiService } from '../services/login-api.service';
import { login, loginFail, loginSuccess } from './login.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LoginEffects {

  constructor(
    private actions$: Actions,
    private loginApiService: LoginApiService,
  ) {}

  @Effect()
  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => {
      return this.loginApiService.login(action.username, action.password).pipe(
        map(token => loginSuccess({token})),
        catchError(error => of(loginFail({error: error.message}))),
      );
    }),
  ));
}
