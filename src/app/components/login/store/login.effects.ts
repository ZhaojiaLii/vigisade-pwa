import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginApiService } from '../services/login-api.service';
import {
  askUpdatePassword, askUpdatePasswordFail, askUpdatePasswordSuccess,
  googleLogin,
  googleLoginFail,
  googleLoginSuccess,
  login,
  loginFail,
  loginSuccess,
  loginWait,
} from './login.actions';
import { catchError, map, skip, switchMap, tap } from 'rxjs/operators';
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
        map((token) => {
          const tkn = this.cookie.get(TOKEN_KEY);
          if (!tkn) {
            return loginSuccess({token, spinnerEnable: false});
          } else {
            return loginWait();
          }
        }),
        catchError(error => {
          this.toastrService.error(this.translateService.instant('Login.Error'));
          return of(loginFail({error: error.message, spinnerEnable: false}));
        }),
      );
    }),
  ));

  wait$ = createEffect(() => this.actions$.pipe(
    ofType(loginWait),
    skip(1)
  ));

  postLoginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(action => {
      this.cookie.setWithExpiryInHours(TOKEN_KEY, action.token, 23);
    })
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

  askUpdatePassword$ = createEffect(() => this.actions$.pipe(
    ofType(askUpdatePassword),
    switchMap(action => {
      return this.loginApiService.askUpdatePassword(action.username).pipe(
        map(() => askUpdatePasswordSuccess()),
        catchError(error => {
          this.toastrService.error(this.translateService.instant('Login.Error'));
          return of(askUpdatePasswordFail(error));
        })
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private cookie: CookieServices,
    private loginApiService: LoginApiService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {}
}
