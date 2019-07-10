import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataState } from '../store/data/data.state';
import { Direction } from '../components/shared/interfaces/direction.interface';
import { Observable } from 'rxjs';
import { getAreas, getDirections, getEntities } from '../store/data/data.selectors';
import { Area } from '../components/shared/interfaces/area.interface';
import { Entity } from '../components/shared/interfaces/entity.interface';
import { loadData } from '../store/data/data.actions';
@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(
    private store: Store<DataState>,
  ) {}

  loadData(): void {
    this.store.dispatch(loadData());
  }

  getDirections(): Observable<Direction[]> {
    return this.store.pipe(select(getDirections));
  }

  getAreas(): Observable<Area[]> {
    return this.store.pipe(select(getAreas));
  }

  getEntities(): Observable<Entity[]> {
    return this.store.pipe(select(getEntities));
  }
}
