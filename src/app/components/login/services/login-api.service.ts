import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {

  constructor(private http: HttpClient) {}

  /**
   * Gets authentication token.
   */
  login(username: string, password: string): Observable<string> {
    return this.http.post(
      '/api/login_check',
      {username, password},
      {observe: 'response'}
    ).pipe(
      tap((response: HttpResponse<{token: string}>) => {
        if (response.status === 200 && response.body && response.body.token) {
            return;
        }

        throw new Error('Bad credentials.');
      }),
      map(response => response.body.token)
    );
  }
}
