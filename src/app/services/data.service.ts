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
  getDangerousSituationTypes
} from '../store/data/data.selectors';
import { Area } from '../components/shared/interfaces/area.interface';
import { Entity } from '../components/shared/interfaces/entity.interface';
import { loadData, loadHeader } from '../store/data/data.actions';
import { Header } from '../interfaces/header.interface';
import { DangerousSituationType } from '../components/dangerous/interfaces/dangerous-situation-type.interface';
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

  getDangerousSituationTypes(): Observable<DangerousSituationType[]> {
    return this.store.pipe(select(getDangerousSituationTypes));
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
