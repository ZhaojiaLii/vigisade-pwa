export interface MenuOptions {
  displayBackNav: boolean;
  routeLabel: string;
}

export const DEFAULT_MENU_OPTIONS: MenuOptions = {
  displayBackNav: false,
  routeLabel: null,
};

export const MENU_SETUP: {[key: string]: MenuOptions} = {
  '/visit': {...DEFAULT_MENU_OPTIONS, routeLabel: 'Visite'},
  '/tutorial': {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Tutorial'},
  '/dangerous': {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Situation dangereuse'}
};
