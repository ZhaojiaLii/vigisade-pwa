import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HistoryState } from '../store/history.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  goToNextCategory,
  loadHistory,
  loadResult,
  selectCategory,
  selectResult,
  setHistorySearch
} from '../store/history.actions';
import {
  getDesktopHistoryByDate,
  getFilteredUserHistory,
  getHistory,
  getResult,
  getSelectedResult,
  getSelectedResultArea,
  getSelectedResultCategory,
  getSelectedResultCategoryId,
  getSelectedResultEntity,
  getSelectedResultQuestions,
  getUserHistory,
  getUserHistoryByDate
} from '../store/history.selectors';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../survey/interfaces/getSurveys/category.interface';
import { GetResult } from '../../survey/interfaces/getResultInterface/getResult.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { HistorySearch } from '../interfaces/history-search.interface';
import { HistoryResult } from '../../survey/interfaces/getResultInterface/history-result.interface';
import { Result } from '../../survey/interfaces/results/result.interface';
import { GOOD_PRACTICE_CATEGORY_ID } from '../../survey/interfaces/getResultInterface/bestPractice.interface';
import { QuestionResult } from '../interfaces/question-result.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {

  constructor(private store: Store<HistoryState>) { }

  loadResult(id: number): void {
    this.store.dispatch(loadResult({id}));
  }

  selectResult(id: number): void {
    this.store.dispatch(selectResult({id}));
  }

  selectResultCategory(id: number): void {
    this.store.dispatch(selectCategory({id}));
  }

  goToNextResultCategory(): void {
    this.store.dispatch(goToNextCategory());
  }

  loadHistory(): void {
    this.store.dispatch(loadHistory());
  }

  setSearch(searchParams: HistorySearch): void {
    this.store.dispatch(setHistorySearch({searchParams}));
  }

  getHistory(): Observable<GetResult> {
    return this.store.pipe(select(getHistory));
  }

  getDesktopHistory(): Observable<HistoryResult[]> {
    return this.store.pipe(select(getFilteredUserHistory));
  }

  getHistoryOrderedByDate(): Observable<HistoryResult[]> {
    return this.store.pipe(select(getDesktopHistoryByDate));
  }

  getMobileHistory(): Observable<HistoryResult[]> {
    return this.store.pipe(select(getUserHistory));
  }

  getUserHistoryOrderedByDate(): Observable<HistoryResult[]> {
    return this.store.pipe(select(getUserHistoryByDate));
  }

  getResult(): Observable<Result[]> {
    return this.store.pipe(select(getResult));
  }

  getSelectedResult(): Observable<Result> {
    return this.store.pipe(select(getSelectedResult));
  }

  getSelectedResultEntity(): Observable<Entity> {
    return this.store.pipe(select(getSelectedResultEntity));
  }

  getSelectedResultArea(): Observable<Area> {
    return this.store.pipe(select(getSelectedResultArea));
  }

  getSelectedCategory(): Observable<Category> {
    return this.store.pipe(select(getSelectedResultCategory));
  }

  isGoodPracticeSelected(): Observable<boolean> {
    return this.store.pipe(
      select(getSelectedResultCategoryId),
      map(id => id === GOOD_PRACTICE_CATEGORY_ID),
    );
  }

  getSelectedQuestions(): Observable<QuestionResult[]> {
    return this.store.pipe(select(getSelectedResultQuestions));
  }
}
