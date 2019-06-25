import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../interfaces/getSurveyInterface/survey.interface';
import { TokenInterceptor } from '../../../interceptors/token-interceptor.service';
import { GetResults } from '../interfaces/getResultsInterface/getResults.interface';
import { environment } from '../../../../environments/environment';
import { SurveyEffects } from '../store/survey.effects';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey> {
    // @todo: you must add the auth token via interceptor to run this endpoint.
    const url = this.baseUrl + '/api/survey/';
    return this.http.get<Survey>(url);
  }

  getResults(): Observable<GetResults> {
    const url = this.baseUrl + '/api/survey/history/';
    return this.http.get<GetResults>(url);
  }

  getResult(): Observable<GetResult> {
    const id = 0;
    const url = this.baseUrl + '/api/survey/history/' + id + '/';
    return this.http.get<GetResult>(url);
  }
}
