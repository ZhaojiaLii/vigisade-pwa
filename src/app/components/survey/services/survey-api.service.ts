import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Survey } from '../interfaces/getSurveys/survey.interface';
import { Result } from '../interfaces/results/result.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  constructor(private http: HttpClient) {}

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey>('/api/survey/', {observe: 'response'}).pipe(
      // Waiting API fix.
      map(response => {
        if (response.status === 204) {
          return null;
        }

        return [response.body];
      }),
    );
  }

  createResult(createResult: Result): Observable<number> {
    return this.http.post(
      '/api/survey/create/',
      createResult,
      {observe: 'response'},
      ).pipe(
        tap((response: HttpResponse<{status: number}>) => {
          if (response && response.status) {
              return;
          }
        }),
        map(response => response.status)
    );
  }

  updateResult(updateResult: UpdateResult): Observable<number> {
    return this.http.post(
      '/api/survey/update/',
       updateResult,
      {observe: 'response'},
      ).pipe(
        tap((response: HttpResponse<{status: number}>) => {
          if (response && response.status) {
              console.log('update result succeed');
              return;
          }
          throw new Error('Bad credentials.');
        }),
        map(response => response.status)
    );
  }
}
