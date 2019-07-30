import { Action, createReducer, on } from '@ngrx/store';
import { layoutInitialState, LayoutState } from './layout.state';
import { closeMenu, toggleMenu, toggleTutorial } from './layout.actions';

const createLayoutReducer = createReducer(
  layoutInitialState,
  on(toggleMenu, state => ({...state, menuOpen: !state.menuOpen})),
  on(closeMenu, state => ({...state, menuOpen: false})),
  on(toggleTutorial, state => ({...state, openTutorial: !state.openTutorial})),
);

export function layoutReducer(state: LayoutState | undefined, action: Action) {
  return createLayoutReducer(state, action);
}
