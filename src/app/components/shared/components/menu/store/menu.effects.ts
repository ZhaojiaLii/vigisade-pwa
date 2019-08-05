import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { map } from 'rxjs/operators';
import { DEFAULT_MENU_OPTIONS, MENU_SETUP } from '../interfaces/menu-options.interface';
import { setOptions } from './menu.actions';

@Injectable()
export class MenuEffects {
  setMenuOptions$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    map((action: RouterNavigationAction) => action.payload.routerState),
    map(url => {
        const path = url.root.firstChild.routeConfig.path;
        return MENU_SETUP.hasOwnProperty(path)
          ? MENU_SETUP[path]
          : DEFAULT_MENU_OPTIONS;
    }),
    map(options => setOptions({options})),
  ));

  constructor(
    private actions$: Actions,
  ) {}
}
