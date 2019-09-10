import { Action, createReducer, on } from '@ngrx/store';
import { layoutInitialState, LayoutState } from './layout.state';
import { closeMenu, redirectToHomepage, toggleMenu } from './layout.actions';

const createLayoutReducer = createReducer(
  layoutInitialState,
  on(toggleMenu, state => ({...state, menuOpen: !state.menuOpen})),
  on(closeMenu, state => ({...state, menuOpen: false})),
  on(redirectToHomepage, state => ({...state, redirectHome: true})),
);

export function layoutReducer(state: LayoutState | undefined, action: Action) {
  return createLayoutReducer(state, action);
}
