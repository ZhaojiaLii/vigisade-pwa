import { createAction, props } from '@ngrx/store';
import { DelayedRequest } from '../../interfaces/delayed-request.interface';

export const delayPost = createAction(
  '[Buffer] Delay Post',
  props<{ request: DelayedRequest }>(),
);

export const replayPost = createAction(
  '[Buffer] Replay Post',
  props<{ delayedRequest: DelayedRequest }>(),
);

export const replayPostSuccess = createAction(
  '[Buffer] Replay Post Success',
  props<{ id: string }>(),
);

export const replayPostError = createAction(
  '[Buffer] Replay Post Error',
  props<{ error: string }>(),
);
