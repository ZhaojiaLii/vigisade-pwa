import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Result } from '../../visit/interfaces/results/result.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryApiService {

  constructor(private http: HttpClient) {}

  getHistory(): Observable<GetResult> {
    return this.http.get<GetResult>('/api/survey/history/');
  }

  getResult(id: number): Observable<Result> {
    return this.http.get<Result>('/api/survey/history/' + id + '/');
  }
}
