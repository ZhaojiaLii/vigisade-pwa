import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { TOKEN_KEY } from '../../../data/auth.const';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
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

  logout() {
    this.cookie.delete(TOKEN_KEY);
  }
}
