import { loadUser } from '../store/profile.action';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProfileState } from '../store/profile.state';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { getUser, getUserArea, getUserDirection, getUserEntity } from '../store/profile.selector';
import { Direction } from '../../shared/interfaces/direction.interface';
import { Area } from '../../shared/interfaces/area.interface';
import { Entity } from '../../shared/interfaces/entity.interface';

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

  getUserDirection(): Observable<Direction> {
    return this.store.pipe(select(getUserDirection));
  }

  getUserArea(): Observable<Area> {
    return this.store.pipe(select(getUserArea));
  }

  getUserEntity(): Observable<Entity> {
    return this.store.pipe(select(getUserEntity));
  }
}
