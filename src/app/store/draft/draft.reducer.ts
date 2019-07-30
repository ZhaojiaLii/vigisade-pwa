import { Action, createReducer, on } from '@ngrx/store';
import { setResultDraft } from './draft.actions';
import { draftInitialState, DraftState } from './draft.state';

export const createDraftReducer = createReducer(
  draftInitialState,
  on(setResultDraft, (state, {draft}) => ({
    ...state,
    survey: draft,
  })),
);

export function draftReducer(state: DraftState | undefined, action: Action) {
  return createDraftReducer(state, action);
}

