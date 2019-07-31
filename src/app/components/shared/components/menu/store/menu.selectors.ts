import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './menu.state';

export const getMenuState = createFeatureSelector<MenuState>('menu');

export const getOptions = createSelector(
  getMenuState,
  state => state.options,
);
