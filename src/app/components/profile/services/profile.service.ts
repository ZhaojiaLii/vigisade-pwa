import { loadUser, updateUser } from '../store/profile.action';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProfileState } from '../store/profile.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { getUser, getUserDirection, getUserEntities } from '../store/profile.selector';
import { Direction } from '../../shared/interfaces/direction.interface';
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

  getUserDirection(): Observable<Direction> {
    return this.store.pipe(select(getUserDirection));
  }

  getUserEntities(): Observable<Entity[]> {
    return this.store.pipe(select(getUserEntities));
  }
}
