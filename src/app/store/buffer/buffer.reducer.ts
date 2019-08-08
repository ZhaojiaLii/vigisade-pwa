import { Action, createReducer, on } from '@ngrx/store';
import { BufferState, initialBufferState } from './buffer.state';
import { addResultToBuffer } from './buffer.actions';

const createBufferReducer = createReducer(
  initialBufferState,
  on(addResultToBuffer, (state, {result}) => ({
    ...state,
    surveyResults: state.surveyResults.concat([result]),
  })),
);

export function bufferReducer(state: BufferState | undefined, action: Action) {
  return createBufferReducer(state, action);
}
