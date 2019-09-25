import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginApiService } from '../services/login-api.service';
import { googleLogin, googleLoginFail, googleLoginSuccess, login, loginFail, loginSuccess } from './login.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CookieServices } from '../../../services/cookie-services.service';
import { TOKEN_KEY } from '../../../data/auth.const';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action => {
      return this.loginApiService.login(action.username, action.password).pipe(
        map((token) => loginSuccess({token, spinnerEnable: false})),
        catchError(error => {
          this.toastrService.error(this.translateService.instant('Login.Error'));
          return of(loginFail({error: error.message, spinnerEnable: false}));
        }),
      );
    }),
  ));

  postLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(action => this.cookie.setWithExpiryInHours(TOKEN_KEY, action.token, 23))
  ), {dispatch: false});

  googleLogin$ = createEffect(() => this.actions$.pipe(
    ofType(googleLogin),
    switchMap(action => {
      return this.loginApiService.googleLogin(action.username, action.password).pipe(
        map((token) => googleLoginSuccess({token, spinnerEnable: false})),
        catchError(error => {
          this.toastrService.error(this.translateService.instant('Login.Error'));
          return of(googleLoginFail({error: error.message, spinnerEnable: false}));
        }),
      );
    }),
  ));

  postGoogleLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(googleLoginSuccess),
    tap(action => this.cookie.setWithExpiryInHours(TOKEN_KEY, action.token, 23))
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private cookie: CookieServices,
    private loginApiService: LoginApiService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {}
}
