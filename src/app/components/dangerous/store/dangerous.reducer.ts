import { Action, createReducer, on } from '@ngrx/store';
import { dangerousInitialState, DangerousState } from './dangerous.states';
import { createDangerousSituation, createDangerousSituationFail, createDangerousSituationSuccess, setLoadingState } from './dangerous.action';
import { getRandomId } from '../../../data/random.helpers';

export const createDangerousReducer = createReducer(
  dangerousInitialState,
  on(setLoadingState, (state, {loading}) => ({...state, loading})),
  on(createDangerousSituationFail, (state, {dangerousSituation}) => ({
    ...state,
    unsavedDangerousSituations: state.unsavedDangerousSituations.concat({
      id: getRandomId(),
      dangerousSituation,
    }),
  })),
);

export function dangerousReducer(state: DangerousState | undefined, action: Action) {
  return createDangerousReducer(state, action);
}
