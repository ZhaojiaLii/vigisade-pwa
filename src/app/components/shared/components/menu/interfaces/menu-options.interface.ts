export interface MenuOptions {
  displayBackNav: boolean;
  routeLabel: string;
}

export const DEFAULT_MENU_OPTIONS: MenuOptions = {
  displayBackNav: false,
  routeLabel: null,
};

export const MENU_SETUP: {[key: string]: MenuOptions} = {
  visit: {...DEFAULT_MENU_OPTIONS, routeLabel: 'Visite.Visite'},
  tutorial: {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Menu.Tutoriel'},
  dangerous: {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Menu.Situation dangereuse'},
  history: {...DEFAULT_MENU_OPTIONS, displayBackNav: false, routeLabel: 'Menu.Historique des visites'},
  'history/:id': {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Visite.Visite'},
  profile: {...DEFAULT_MENU_OPTIONS, displayBackNav: false, routeLabel: 'Menu.Mon profil'},
  atraiter: {...DEFAULT_MENU_OPTIONS, displayBackNav: false, routeLabel: 'Menu.Atraiter'},
  'atraiter/:id': {...DEFAULT_MENU_OPTIONS, displayBackNav: true, routeLabel: 'Menu.Action corrective'},
};
