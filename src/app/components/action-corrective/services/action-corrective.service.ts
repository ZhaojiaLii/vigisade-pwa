import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { createCorrection, loadCorrection, updateCorrection } from '../store/correction.actions';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Observable } from 'rxjs';
import {
  getCorrection,
  getCorrectionCategory,
  getCorrectionQuestion, getCorrectionResult,
  getCorrectionSurvey, getUserMobileCorrection
} from '../store/correction.selector';
import { Survey } from '../../survey/interfaces/getSurveys/survey.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { map } from 'rxjs/operators';
import { Result } from '../../survey/interfaces/results/result.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveService {

  constructor(private store: Store<State>) { }

  loadCorrection(): void {
    this.store.dispatch(loadCorrection());
  }

  getCorrection(): Observable<Correction[]> {
    return this.store.pipe(select(getCorrection));
  }

  getMobileCorrection(): Observable<Correction[]> {
    return this.store.pipe(select(getUserMobileCorrection));
  }

  countCorrection(): Observable<number> {
    return this.getCorrection().pipe(
      map(correction => correction ? correction.length : null),
    );
  }

  countMobileCorrection(): Observable<number> {
    return this.getMobileCorrection().pipe(
      map(correction => correction ? correction.length : null),
    );
  }

  getCorrectionSurvey(): Observable<Survey> {
    return this.store.pipe(select(getCorrectionSurvey));
  }

  getCorrectionResult(): Observable<Result> {
    return this.store.pipe(select(getCorrectionResult));
  }

  getCorrectionCategory(): Observable<any> {
    return this.store.pipe(select(getCorrectionCategory));
  }

  getCorrectionQuestion(): Observable<any> {
    return this.store.pipe(select(getCorrectionQuestion));
  }

  updateCorrection(updateCorrectionPayload: UpdateCorrection): void {
    this.store.dispatch(updateCorrection({updateCorrectionPayload}));
  }

  createCorrection(createCorrectionPayload: CreateCorrection): void {
    this.store.dispatch(createCorrection({createCorrectionPayload}));
  }
}
