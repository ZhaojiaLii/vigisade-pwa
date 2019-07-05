
import { login } from '../store/login.actions';


import { State } from '../../../store/app.state';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { getToken } from '../store/login.selectors';

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

  getToken(): Observable<string> {
    return this.store.pipe(select(getToken));
  }

  isLogged(): Observable<boolean> {
    return this.getToken().pipe(
      map(token => !!token)
    );
  }
}
