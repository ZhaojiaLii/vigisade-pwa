import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { Observable, of } from 'rxjs';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {

  constructor(private http: HttpClient) {}

  getHistory(): Observable<GetResult> {
    // const  headers = new  HttpHeaders().set('user_id', '25').set('user_roles', 'ROLE_ADMIN');
    // return this.http.get<GetResult>('/api/survey/history', {headers});
    return of({}).pipe(
      map(() => ({
        userId: 25,
        result: [
          {
            resultId: 6,
            resultDirection: 91,
            resultDate: '2019-07-03',
            resultPlace: '32 Rue Ponthieu, 75008 Paris',
            resultClient: 'Zhli',
            resultUserId: 48,
            resultValidated: true,
          },
          {
            resultId: 7,
            resultDirection: 91,
            resultDate: '2019-07-03',
            resultPlace: '33 rue des 3 bornes, 75011 paris',
            resultClient: 'xu',
            resultUserId: 48,
            resultValidated: true,
          },
      ]
      }))
    );
  }

  getResult(id: number): Observable<Result> {
   return this.http.get<Result>('/api/survey/history/' + id + '/');
  }
}
