import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { login } from '../store/login.actions';
import { Observable } from 'rxjs';
import { getToken } from '../store/login.selectors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private store: Store<State>,
  ) {}

  login(username: string, password: string): void {
    this.store.dispatch(login({ username, password }));
  }

  isLogged(): Observable<boolean> {
    return this.store.pipe(
      select(getToken),
      map(token => !!token),
    );
  }
}
