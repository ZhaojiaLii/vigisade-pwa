import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createResult, loadResult, loadResults, loadSurvey, updateResult } from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/survey.interface';
import { getResult, getResults, getResultsCount, getSurvey, getTeamMembers } from '../store/survey.selectors';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';
import { Results } from '../interfaces/getResultsInterface/results.interface';

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

  loadResults(): void {
    this.store.dispatch(loadResults());
  }

  getSurvey(): Observable<Survey> {
    return this.store.pipe(select(getSurvey));
  }

  getResult(): Observable<GetResult> {
    return this.store.pipe(select(getResult));
  }

  getResults(): Observable<Results[]> {
    return this.store.pipe(select(getResults));
  }

  getTeamMembers(): Observable<any> {
    return this.store.pipe(select(getTeamMembers));
  }

  getResultsCount(): Observable<number> {
    return this.store.pipe(select(getResultsCount));
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }
}
