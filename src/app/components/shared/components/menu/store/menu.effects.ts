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
    map((action: RouterNavigationAction) => action.payload.event.url),
    map(url => {
        return MENU_SETUP.hasOwnProperty(url)
          ? MENU_SETUP[url]
          : DEFAULT_MENU_OPTIONS;
    }),
    map(options => setOptions({options})),
  ));

  constructor(
    private actions$: Actions,
  ) {}
}
