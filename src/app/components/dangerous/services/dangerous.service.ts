import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/app.state';
import { CreateDangerous } from '../interfaces/createDangerous.interface';
import { createDangerous, loadDangerousType } from '../store/dangerous.action';
import { Observable } from 'rxjs';
import { GetDangerousType } from '../interfaces/getDangerousType.interface';
import { getDangerousType } from '../store/dangerous.selector';

@Injectable({
  providedIn: 'root'
})
export class DangerousService {

  constructor(
    private store: Store<State>
  ) { }

  createDangerous(dangerousPayload: CreateDangerous): void {
    this.store.dispatch(createDangerous({dangerousPayload}));
  }

  loadDangerousType(): void {
    this.store.dispatch(loadDangerousType());
  }

  getDangerousType(): Observable<GetDangerousType> {
    return this.store.pipe(select(getDangerousType));
  }
}
