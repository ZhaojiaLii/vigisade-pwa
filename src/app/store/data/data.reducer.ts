import { Action, createReducer, on } from '@ngrx/store';
import { DataState, initialDataState } from './data.state';
import { loadDataSuccess, loadHeaderSuccess } from './data.actions';

const createDataReducer = createReducer(
  initialDataState,
  on(loadDataSuccess, (state, {data}) => ({...state, data})),
  on(loadHeaderSuccess, (state, {header}) => ({...state, header})),
);

export function dataReducer(state: DataState | undefined, action: Action) {
  return createDataReducer(state, action);
}
