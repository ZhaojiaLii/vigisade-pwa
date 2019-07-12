import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createResult, loadResult, loadHistory, loadSurvey, updateResult } from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/survey.interface';
import { getHistory, getResult, getSurvey, getTeamMembers } from '../store/survey.selectors';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { Result } from '../interfaces/result.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private store: Store<SurveyState>) { }

  loadSurvey(): void {
    this.store.dispatch(loadSurvey());
  }

  loadResult(id: number): void {
    this.store.dispatch(loadResult({id}));
  }

  loadHistory(): void {
    this.store.dispatch(loadHistory());
  }

  getSurvey(): Observable<Survey> {
    return this.store.pipe(select(getSurvey));
  }

  getResult(): Observable<GetResult> {
    return this.store.pipe(select(getResult));
  }

  getHistory(): Observable<Result[]> {
    return this.store.pipe(select(getHistory));
  }

  countHistory(): Observable<number> {
    return this.getHistory().pipe(
      map(history => history ? history.length : null),
    );
  }

  getTeamMembers(): Observable<any> {
    return this.store.pipe(select(getTeamMembers));
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }
}
