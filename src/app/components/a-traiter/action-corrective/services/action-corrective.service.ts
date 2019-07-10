import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../../store/app.state';
import {createCorrection, getCorrection, updateCorrection} from '../store/correction.actions';
import {UpdateCorrection} from '../interfaces/updateCorrection/updateCorrection.interface';
import {CreateCorrection} from '../interfaces/createCorrection/createCorrection.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveService {

  constructor(private store: Store<State>) { }

  getCorrection(): any {
    this.store.dispatch(getCorrection());
  }

  updateCorrection(updateCorrectionPayload: UpdateCorrection): void {
    this.store.dispatch(updateCorrection({updateCorrectionPayload}));
  }

  createCorrection(createCorrectionPayload: CreateCorrection): void {
    this.store.dispatch(createCorrection({createCorrectionPayload}));
  }
}
