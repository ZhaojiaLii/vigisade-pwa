import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createResult, getResults, loadResult, loadSurvey, updateResult } from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/survey.interface';
import { getResult, getSurvey } from '../store/survey.selectors';
import { GetResult } from '../interfaces/getResultInterface/getResult.interface';

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

  getSurvey(): Observable<Survey> {
    return this.store.pipe(select(getSurvey));
  }

  getResults(): void {
    this.store.dispatch(getResults());
  }

  getResult(): Observable<GetResult> {
    return this.store.pipe(select(getResult));
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }
}
