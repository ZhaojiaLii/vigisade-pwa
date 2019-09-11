import { login, setToken } from '../store/login.actions';
import { State } from '../../../store/app.state';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {getSpinnerEnable, getToken} from '../store/login.selectors';

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

  setToken(token: string): void {
    this.store.dispatch(setToken({token, spinnerEnable: false}));
  }

  getToken(): Observable<string> {
    return this.store.pipe(select(getToken));
  }

  getSpinnerEnable(): Observable<boolean> {
    return this.store.pipe(select(getSpinnerEnable));
  }

  isLogged(): Observable<boolean> {
    return this.getToken().pipe(
      map(token => !!token)
    );
  }
}
