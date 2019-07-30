import { loadUser, updateUser } from '../store/profile.action';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProfileState } from '../store/profile.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { getUser, getUserArea } from '../store/profile.selector';
import { Entity } from '../../shared/interfaces/entity.interface';
import { UpdateUser } from '../interfaces/updateUser.interface';

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

  updateUser(updateUserPayload: UpdateUser): void {
    this.store.dispatch(updateUser({updateUserPayload}));
  }

  getUserEntities(): Observable<Entity[]> {
    return this.store.pipe(
      select(getUserArea),
      filter(area => !!area),
      map(area => area.entity),
    );
  }
}
