import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginApiService } from '../services/login-api.service';
import { login, loginFail, loginSuccess } from './login.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieService } from '../../../services/cookie.service';
import { TOKEN_KEY } from '../../../data/auth.const';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => {
      return this.loginApiService.login(action.username, action.password).pipe(
        map(token => loginSuccess({token})),
        catchError(error => of(loginFail({error: error.message}))),
      );
    }),
  ));

  postLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(action => this.cookie.setWithExpiryInHours(TOKEN_KEY, action.token, 23))
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private cookie: CookieService,
    private loginApiService: LoginApiService,
  ) {}
}
