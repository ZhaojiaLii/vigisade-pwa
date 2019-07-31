import { Action, createReducer, on } from '@ngrx/store';
import { initialMenuState, MenuState } from './menu.state';
import { setOptions } from './menu.actions';

const createMenuReducer = createReducer(
  initialMenuState,
  on(setOptions, (state, {options}) => ({...state, options})),
);

export function menuReducer(state: MenuState | undefined, action: Action) {
  return createMenuReducer(state, action);
}
