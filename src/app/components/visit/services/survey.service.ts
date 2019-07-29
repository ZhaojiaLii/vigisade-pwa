import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createResult, loadSurveys, selectSurveyCategory, setLoadingState, updateResult } from '../store/survey.actions';
import { Result } from '../interfaces/create/result.interface';
import { UpdateResult } from '../interfaces/updateResultInterface/updateResult.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyState } from '../store/survey.state';
import { Survey } from '../interfaces/getSurveys/survey.interface';
import { getSelectedCategoryId, getSurveyOfUser, getSurveySelectedCategory, isLoading } from '../store/survey.selectors';
import { Category } from '../interfaces/getSurveys/category.interface';
import { BEST_PRACTICE_CATEGORY_ID } from '../interfaces/getResultInterface/bestPractice.interface';

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

  createResult(payload: Result): void {
    this.store.dispatch(createResult({payload}));
  }

  updateResult(updateResultPayload: UpdateResult): void {
    this.store.dispatch(updateResult({updateResultPayload}));
  }

  setLoadingState(loading: boolean): void {
    this.store.dispatch(setLoadingState({loading}));
  }

  isLoading(): Observable<boolean> {
    return this.store.pipe(select(isLoading));
  }

  getSurveyOfUser(): Observable<Survey> {
    return this.store.pipe(select(getSurveyOfUser));
  }

  isBestPracticedSelected(): Observable<boolean> {
    return this.store.pipe(
      select(getSelectedCategoryId),
      map(selectedId => selectedId === BEST_PRACTICE_CATEGORY_ID),
    );
  }

  getSurveySelectedCategory(): Observable<Category> {
    return this.store.pipe(select(getSurveySelectedCategory));
  }
}
