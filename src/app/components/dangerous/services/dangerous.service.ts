import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createDangerousSituation } from '../store/dangerous.action';
import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';
import { DangerousState } from '../store/dangerous.states';

@Injectable({
  providedIn: 'root',
})
export class DangerousService {

  constructor(
    private store: Store<DangerousState>,
  ) {}

  createDangerousSituation(dangerousSituation: DangerousSituationPayload): void {
    this.store.dispatch(createDangerousSituation({dangerousSituation}));
  }
}
