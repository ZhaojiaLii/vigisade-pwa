import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createResult, loadSurveys, selectSurveyCategory, updateResult } from '../store/survey.actions';
import { CreateResult } from '../interfaces/createResultInterface/createResult.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/survey.interface';
import { getSurveyOfUser, getSurveySelectedCategory } from '../store/survey.selectors';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  constructor(private store: Store<SurveyState>) { }

  loadSurveys(): void {
    this.store.dispatch(loadSurveys());
  }

  selectSurveyCategory(id: number): void {
    this.store.dispatch(selectSurveyCategory({id}));
  }

  getSurveyOfUser(): Observable<Survey> {
    return this.store.pipe(select(getSurveyOfUser));
  }

  getSurveySelectedCategory(): Observable<Category> {
    return this.store.pipe(select(getSurveySelectedCategory));
  }

  createResult(createResultPayload: CreateResult): void {
    this.store.dispatch(createResult({createResultPayload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }
}
