import { loadUser } from '../store/profile.action';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProfileState } from '../store/profile.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { getUser } from '../store/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private store: Store<ProfileState>,
  ) {}

  loadUser(): void {
    this.store.dispatch(loadUser());
  }

  getUser(): Observable<User> {
    return this.store.pipe(select(getUser));
  }
}
