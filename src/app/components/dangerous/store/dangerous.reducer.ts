import { Action, createReducer, on } from '@ngrx/store';
import { dangerousInitialState, DangerousState } from './dangerous.states';

export const createDangerousReducer = createReducer(
  dangerousInitialState,
);

export function dangerousReducer(state: DangerousState | undefined, action: Action) {
  return createDangerousReducer(state, action);
}
