import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HistoryState } from '../store/history.state';
import { Result } from '../../visit/interfaces/getSurveys/result.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadHistory, loadResult, selectCategory, selectResult } from '../store/history.actions';
import {
  getHistory,
  getResult,
  getSelectedResultCategory,
  getSelectedResult,
  getSelectedResultEntity,
  getSelectedResultSurvey,
  getSelectedResultQuestions,
  getSelectedResultArea
} from '../store/history.selectors';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Category } from '../../visit/interfaces/getSurveys/category.interface';
import { ResultQuestion } from '../interfaces/result-question.interface';
import { GetResult } from '../../visit/interfaces/getResultInterface/getResult.interface';
import { Area } from '../../shared/interfaces/area.interface';

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

  getHistory(): Observable<GetResult> {
    return this.store.pipe(select(getHistory));
  }

  countHistory(): Observable<number> {
    return this.getHistory().pipe(
      map(history => history ? history.result.length : null),
    );
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
  getSelectedCategory(): Observable<Category> {
    return this.store.pipe(select(getSelectedResultCategory));
  }

  getSelectedQuestions(): Observable<ResultQuestion[]> {
    return this.store.pipe(select(getSelectedResultQuestions));
  }
}
