import { loadUser, updateUser } from '../store/profile.action';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProfileState } from '../store/profile.state';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { getUser, getUserArea, getUserDirection } from '../store/profile.selector';
import { Entity } from '../../shared/interfaces/entity.interface';
import { Area } from '../../shared/interfaces/area.interface';

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

  updateUser(updatedFields: Partial<User>): void {
    this.store.dispatch(updateUser({updatedFields}));
  }

  getUser(): Observable<User> {
    return this.store.pipe(select(getUser));
  }

  /**
   * Gets areas from the user's current direction.
   */
  getUserAreas(): Observable<Area[]> {
    return this.store.pipe(
      select(getUserDirection),
      filter(direction => !!direction),
      map(direction => direction.area),
    );
  }

  /**
   * Gets entities from the user's current area.
   */
  getUserEntities(): Observable<Entity[]> {
    return this.store.pipe(
      select(getUserArea),
      filter(area => !!area),
      map(area => area.entity),
    );
  }
}
