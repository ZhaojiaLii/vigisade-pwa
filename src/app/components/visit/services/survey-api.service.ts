import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {
  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey> {
    return this.http.get<Survey>('/api/survey/').skip(0).pipe(
        tap((survey) => {
            if (survey) {
                // console.log(response);
            }
        })
    );
  }

  getResults(): Observable<GetResults> {
    return this.http.get<GetResults>('/api/survey/history/').pipe(
        tap((response) => {
            if (response) {
                // console.log(response);
                return;
            }
        })
    );
  }

  getResult(): Observable<GetResult> {
    const id = 1;
    return this.http.get<GetResult>('/api/survey/history/' + id + '/').pipe(
        tap((response) => {
            if (response) {
                // console.log(response);
                return;
            }
        })
    );
  }

  createResult(createResult: CreateResult): Observable<number> {
    return this.http.post(
      '/api/survey/create/',
      {},
      {observe: 'response'},
      ).pipe(
        tap((response: HttpResponse<{status: number}>) => {
          if (response && response.status) {
              console.log('create result succeed');
              return;
          }
          throw new Error('Bad credentials.');
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
