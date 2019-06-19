import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../interfaces/survey.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyApiService {

  constructor(private http: HttpClient) {}

  getSurvey(): Observable<Survey> {
    // @todo: you must add the auth token via interceptor to run this endpoint.
    return this.http.get<Survey>('/api/survey/');
  }
}
