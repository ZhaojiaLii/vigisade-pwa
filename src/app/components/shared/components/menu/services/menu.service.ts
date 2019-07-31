import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MenuState } from '../store/menu.state';
import { MenuOptions } from '../interfaces/menu-options.interface';
import { getOptions } from '../store/menu.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private store: Store<MenuState>,
  ) {}

  getOptions(): Observable<MenuOptions> {
    return this.store.pipe(select(getOptions));
  }
}
