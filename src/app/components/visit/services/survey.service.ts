import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { createResult, getResult, getResults, getSurvey, openMenu, updateResult } from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(private store: Store<State>) { }

  getSurvey(): any {
    this.store.dispatch(getSurvey());
  }

  getResults(): void {
    this.store.dispatch(getResults());
  }

  getResult(): void {
    this.store.dispatch(getResult());
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }

  openMenu(): void {
    this.store.dispatch(openMenu());
  }
}
