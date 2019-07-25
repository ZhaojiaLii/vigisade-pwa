import { Action, createReducer, on } from '@ngrx/store';
import { historyInitialState, HistoryState } from './history.state';
import { loadHistorySuccess, loadResultSuccess, selectCategory, selectResult } from './history.actions';

export const createHistoryReducer = createReducer(
  historyInitialState,
  on(selectResult, (state, {id}) => ({
    ...state,
    layout: {...state.layout, selectedResult: id},
  })),
  on(selectCategory, (state, {id}) => ({
    ...state,
    layout: {...state.layout, selectedCategory: id},
  })),
  on(loadHistorySuccess, (state, {history}) => ({...state, history})),
  on(loadResultSuccess, (state, {result}) => ({
    ...state,
    results: state.userResults
      .filter(currentResult => currentResult.resultId !== result.resultId)
      .concat(result),
  })),
);

export function historyReducer(state: HistoryState | undefined, action: Action) {
  return createHistoryReducer(state, action);
}

