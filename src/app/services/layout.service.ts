import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LayoutState } from '../store/layout/layout.state';
import { Observable } from 'rxjs';
import { isMenuOpen } from '../store/layout/layout.selectors';
import { closeMenu, toggleMenu } from '../store/layout/layout.actions';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  constructor(
    private store: Store<LayoutState>,
  ) {}

  closeMenu(): void {
    this.store.dispatch(closeMenu());
  }

  toggleMenu(): void {
    this.store.dispatch(toggleMenu());
  }

  isMenuOpen(): Observable<boolean> {
    return this.store.pipe(select(isMenuOpen));
  }
}
