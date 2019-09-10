import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.state';

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const isMenuOpen = createSelector(
  getLayoutState,
  (state: LayoutState) => state.menuOpen,
);

export const redirectHome = createSelector(
  getLayoutState,
  (state: LayoutState) => state.redirectHome,
);
