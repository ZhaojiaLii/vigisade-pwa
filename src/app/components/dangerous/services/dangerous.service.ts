import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { createDangerousSituation, loadHistoryDangerous, setDangerousSearch } from '../store/dangerous.action';
import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';
import { DangerousState } from '../store/dangerous.states';
import {
  getDangerousSituationHistory,
  getFilteredDangerous,
  getFilteredDangerousByDate
} from '../store/dangerous.selector';
import { DangerousSearch } from '../../history-dangerous/interfaces/dangerous-search.interface';

@Injectable({
  providedIn: 'root',
})
export class DangerousService {

  constructor(
    private store: Store<DangerousState>,
  ) {}

  createDangerousSituation(dangerousSituation: DangerousSituationPayload): void {
    this.store.dispatch(createDangerousSituation({dangerousSituation}));
  }

  loadDangerousHistory(): void {
    this.store.dispatch(loadHistoryDangerous());
  }

  getDangerousHistory() {
    return this.store.pipe(select(getDangerousSituationHistory));
  }

  getFilteredDangerous() {
    return this.store.pipe(select(getFilteredDangerous));
  }

  getDangerousByDate() {
    return this.store.pipe(select(getFilteredDangerousByDate));
  }

  setSearch(searchParams: DangerousSearch) {
    this.store.dispatch(setDangerousSearch({searchParams}));
  }
}
