import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { environment } from '../../../../environments/environment';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey> {
    const url = this.baseUrl + '/api/survey/';
    return this.http.get<Survey>(url).skip(0).pipe(
        tap((survey) => {
            if (survey) {
                // console.log(response);
            }
        })
    );
  }

  getResults(): Observable<GetResults> {
    const url = this.baseUrl + '/api/survey/history/';
    return this.http.get<GetResults>(url).pipe(
        tap((response) => {
            if (response) {
                console.log(response);
                return;
            }
        })
    );
  }

  getResult(): Observable<GetResult> {
    const id = 0;
    const url = this.baseUrl + '/api/survey/history/' + id + '/';
    return this.http.get<GetResult>(url).pipe(
        tap((response) => {
            if (response) {
                console.log(response);
                return;
            }
        })
    );
  }

  createResult(createResult: CreateResult): Observable<number> {
    const url = this.baseUrl + '/api/survey/create/';
    return this.http.post(url, {}, {observe: 'response'}, ).pipe(
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
    const url = this.baseUrl + '/api/survey/update/';
    return this.http.post(url, updateResult, {observe: 'response'}, ).pipe(
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
