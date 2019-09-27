import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router,
  ) {}

  /**
   * Gets authentication token.
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post(
      '/api/login_check',
      {username : username.trim(), password},
      {observe: 'response'}
    ).pipe(
      tap((response: HttpResponse<{token: string}>) => {
        if (response.status === 200 && response.body && response.body.token) {
            return;
        }
        throw new Error('Bad credentials.');
      }),
      map(response => {
        return response.body.token;
      }),
    );
  }

  googleLogin(username: string, password: string): Observable<string> {
    return this.http.post(
      '/api/connect/google',
      {username : username.trim(), password},
      {observe: 'response'},
    ).pipe(
      tap((response: HttpResponse<{token: string}>) => {
        if (response.status === 200 && response.body && response.body.token) {
          return;
        }
        throw new Error('Bad credentials.');
      }),
      map(response => {
        return response.body.token;
      }),
    );
  }

  logout() {
    this.cookie.deleteAll();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
