import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CookieServices } from '../cookie-services.service';
import { TOKEN_KEY } from '../../data/auth.const';
import { LoginService } from '../../components/login/services/login.service';
import { switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private cookie: CookieServices,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
  }
}
