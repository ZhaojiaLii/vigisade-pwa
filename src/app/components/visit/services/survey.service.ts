import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {createResult, getResult, getResults, loadSurvey, updateResult} from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/survey.interface';
import { getSurvey } from '../store/survey.selectors';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private store: Store<SurveyState>) { }

  loadSurvey(): void {
    this.store.dispatch(loadSurvey());
  }

  getSurvey(): Observable<Survey> {
    return this.store.pipe(select(getSurvey));
  }

  getResults(): void {
    this.store.dispatch(getResults());
  }

  getResult(): void {
    // this.store.dispatch(getResult());
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }
}
