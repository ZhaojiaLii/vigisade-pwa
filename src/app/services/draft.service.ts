import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DraftState } from '../store/draft/draft.state';
import { Observable } from 'rxjs';
import { ResultDraft } from '../components/survey/interfaces/results/result-draft.interface';
import { getSurveyDraft } from '../store/draft/draft.selectors';
import { setResultDraft } from '../store/draft/draft.actions';

@Injectable({
  providedIn: 'root',
})
export class DraftService {

  constructor(
    private store: Store<DraftState>,
  ) {}

  saveSurveyDraft(draft: ResultDraft): void {
    this.store.dispatch(setResultDraft({draft}));
  }

  getSurveyDraft(): Observable<ResultDraft> {
    return this.store.pipe(select(getSurveyDraft));
  }
}
