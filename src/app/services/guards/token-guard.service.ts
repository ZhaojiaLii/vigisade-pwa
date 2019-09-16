import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CookieServices } from '../cookie-services.service';
import { GOOGLE_TOKEN_KEY, TOKEN_KEY } from '../../data/auth.const';
import { LoginService } from '../../components/login/services/login.service';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {

  token$: Observable<string> = this.loginService.getToken();
  google$: Observable<string> = this.loginService.getGoogleToken();
  token = '';
  googleToken = '';
  constructor(
    private loginService: LoginService,
    private cookie: CookieServices,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token$.subscribe(val => this.token = val);
    this.google$.subscribe(val => this.googleToken = val);
    if (this.token) {
      return this.loginService.getToken().pipe(
        switchMap(token => {
          if (token) {
            return of(true);
          }
          const savedToken = this.cookie.get(TOKEN_KEY);
          if (!savedToken) {
            return this.router.navigate(['/']);
          } else {
            this.loginService.setToken(savedToken);
            return this.loginService.isLogged().pipe(
              filter(isLogged => isLogged),
            );
          }
        }),
      );
    } else if (this.googleToken) {
      return this.loginService.getGoogleToken().pipe(
        switchMap(token => {
          if (token) {
            return of(true);
          }
          const savedToken = this.cookie.get(GOOGLE_TOKEN_KEY);
          if (!savedToken) {
            return this.router.navigate(['/']);
          } else {
            this.loginService.setGoogleToken(savedToken);
            return this.loginService.isLogged().pipe(
              filter(isLogged => isLogged),
            );
          }
        }),
      );
    }

  }
}
