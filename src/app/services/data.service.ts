import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataState } from '../store/data/data.state';
import { Direction } from '../components/shared/interfaces/direction.interface';
import { Observable } from 'rxjs';
import {
  getAreas,
  getDirections,
  getEntities,
  getHeader,
  getTypeDangerousSituations
} from '../store/data/data.selectors';
import { Area } from '../components/shared/interfaces/area.interface';
import { Entity } from '../components/shared/interfaces/entity.interface';
import { loadData, loadHeader } from '../store/data/data.actions';
import { Header } from '../interfaces/header.interface';
import { DangerousType } from '../components/dangerous/interfaces/dangerous-type.interface';
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

  loadHeader(): void {
    this.store.dispatch(loadHeader());
  }

  getDirections(): Observable<Direction[]> {
    return this.store.pipe(select(getDirections));
  }

  getTypeDangerousSituations(): Observable<DangerousType> {
    return this.store.pipe(select(getTypeDangerousSituations));
  }

  getAreas(): Observable<Area[]> {
    return this.store.pipe(select(getAreas));
  }

  getEntities(): Observable<Entity[]> {
    return this.store.pipe(select(getEntities));
  }

  getHeader(): Observable<Header> {
    return this.store.pipe(select(getHeader));
  }
}
