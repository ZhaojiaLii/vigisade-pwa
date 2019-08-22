import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import {createCorrection, loadAllUsers, loadCorrection, setATraiterSearch, updateCorrection} from '../store/correction.actions';
import { UpdateCorrection } from '../interfaces/updateCorrection/updateCorrection.interface';
import { CreateCorrection } from '../interfaces/createCorrection/createCorrection.interface';
import { Observable } from 'rxjs';
import {
  getAllUsers,
  getCorrection,
  getCorrectionCategory,
  getCorrectionQuestion,
  getCorrectionResult,
  getCorrectionSurvey,
  getFilteredUserAtraiter,
  getUserMobileCorrection
} from '../store/correction.selector';
import { Survey } from '../../survey/interfaces/getSurveys/survey.interface';
import { Correction } from '../interfaces/getCorrection/correction.interface';
import { map } from 'rxjs/operators';
import { Result } from '../../survey/interfaces/results/result.interface';
import {User} from '../../profile/interfaces/user';
import { ATraiterSearch } from '../../a-traiter/interfaces/a-traiter.search';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveService {

  constructor(private store: Store<State>) { }

  loadCorrection(): void {
    this.store.dispatch(loadCorrection());
  }

  loadAllUsers(): void {
    this.store.dispatch(loadAllUsers());
  }

  getAllUsers(): Observable<User[]> {
    return this.store.pipe(select(getAllUsers))
  }

  getCorrection(): Observable<Correction[]> {
    return this.store.pipe(select(getCorrection));
  }

  getDesktopCorrection(): Observable<Correction[]> {
    return this.store.pipe(select(getFilteredUserAtraiter));
  }

  getMobileCorrection(): Observable<Correction[]> {
    return this.store.pipe(select(getUserMobileCorrection));
  }

  countCorrection(): Observable<number> {
    return this.getDesktopCorrection().pipe(
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

  setSearch(searchParams: ATraiterSearch): void {
    this.store.dispatch(setATraiterSearch({searchParams}));
  }
}
