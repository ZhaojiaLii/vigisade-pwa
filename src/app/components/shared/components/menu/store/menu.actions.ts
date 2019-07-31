import { createAction, props } from '@ngrx/store';
import { MenuOptions } from '../interfaces/menu-options.interface';

export const setOptions = createAction(
  '[Menu] Set Options.',
  props<{options: MenuOptions}>(),
);
