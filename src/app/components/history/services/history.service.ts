import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HistoryState } from '../store/history.state';
import { Observable } from 'rxjs';
import { loadHistory, loadResult, selectCategory, selectResult, setHistorySearch } from '../store/history.actions';
import { getHistory, getResult, getSelectedResultCategory, getSelectedResult, getSelectedResultEntity, getSelectedResultSurvey, getSelectedResultQuestions, getSelectedResultArea, getSelectedResultBestPractice, getFilteredUserHistory, getUserHistory } from '../store/history.selectors';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { ResultQuestion } from '../../visit/interfaces/results/result-question.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { HistorySearch } from '../interfaces/history-search.interface';
import { HistoryResult } from '../../visit/interfaces/getResultInterface/history-result.interface';
import { Result } from '../../visit/interfaces/results/result.interface';

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

  getMobileHistory(): Observable<HistoryResult[]> {
    return this.store.pipe(select(getUserHistory));
  }

  getResult(): Observable<Result[]> {
    return this.store.pipe(select(getResult));
  }

  getSelectedResult(): Observable<Result> {
    return this.store.pipe(select(getSelectedResult));
  }

  getSelectedResultSurvey(): Observable<Survey> {
    return this.store.pipe(select(getSelectedResultSurvey));
  }

  getSelectedResultEntity(): Observable<Entity> {
    return this.store.pipe(select(getSelectedResultEntity));
  }

  getSelectedResultArea(): Observable<Area> {
    return this.store.pipe(select(getSelectedResultArea));
  }

  getSelectedResultBestPractice(): Observable<any> {
    return this.store.pipe(select(getSelectedResultBestPractice));
  }

  getSelectedCategory(): Observable<Category> {
    return this.store.pipe(select(getSelectedResultCategory));
  }

  getSelectedQuestions(): Observable<ResultQuestion[]> {
    return this.store.pipe(select(getSelectedResultQuestions));
  }
}
