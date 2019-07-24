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
  getCorrectionQuestion,
  getCorrectionSurvey
} from '../store/correction.selector';
import { Survey } from '../../visit/interfaces/getSurveys/survey.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { map } from 'rxjs/operators';

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

  countCorrection(): Observable<number> {
    return this.getCorrection().pipe(
      map(correction => correction ? correction.length : null),
    );
  }

  getCorrectionSurvey(): Observable<Survey> {
    return this.store.pipe(select(getCorrectionSurvey));
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
