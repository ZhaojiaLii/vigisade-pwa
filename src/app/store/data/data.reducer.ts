import { Action, createReducer, on } from '@ngrx/store';
import { DataState, initialDataState } from './data.state';
import { loadData, loadDataFail, loadDataSuccess } from './data.actions';

const createDataReducer = createReducer(
  initialDataState,
  on(loadData, state => ({...state})),
  on(loadDataSuccess, (state, {directions, areas, entities}) => ({
    ...state,
    directions,
    areas,
    entities,
  })),
  on(loadDataFail, state => ({...state})),
);

export function dataReducer(state: DataState | undefined, action: Action) {
  return createDataReducer(state, action);
}
