import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { getResult, getResults, getSurvey } from '../store/survey.actions';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private store: Store<State>) { }

  getSurvey(): void {
    this.store.dispatch(getSurvey());
  }

  getResults(): void {
    this.store.dispatch(getResults());
  }

  getResult(): void {
    this.store.dispatch(getResult());
  }
}
