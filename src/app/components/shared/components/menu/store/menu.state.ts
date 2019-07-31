import { DEFAULT_MENU_OPTIONS, MenuOptions } from '../interfaces/menu-options.interface';

export interface MenuState {
  options: MenuOptions;
}

export const initialMenuState = {options: DEFAULT_MENU_OPTIONS};
