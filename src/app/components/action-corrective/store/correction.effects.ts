import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createCorrection,
  createCorrectionFail,
  createCorrectionSuccess,
  loadAllUsers,
  loadAllUsersFail,
  loadAllUsersSuccess,
  loadCorrection,
  loadCorrectionFail,
  loadCorrectionSuccess,
  updateCorrection,
  updateCorrectionFail,
  updateCorrectionSuccess
} from './correction.actions';
import { ActionCorrectiveApiService } from '../services/action-corrective-api.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../../profile/services/profile.service';

@Injectable()
export class CorrectionEffects {

  constructor(
    private actions$: Actions,
    private correctionApi: ActionCorrectiveApiService,
    private user: ProfileService,
  ) {}


  loadCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(loadCorrection),
    switchMap(() => {
      return this.correctionApi.loadCorrection().pipe(
        map(correctiveAction => loadCorrectionSuccess({correctiveAction})),
        catchError(error => of(loadCorrectionFail({error: error.message}))),
      );
    })
  ));


  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadAllUsers),
    switchMap(() => {
      return this.correctionApi.loadAllUsers().pipe(
        map( users => loadAllUsersSuccess({users})),
        catchError(error => of(loadAllUsersFail({error: error.message}))),
      );
    })
  ));


  updateCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(updateCorrection),
    switchMap(action => {
      return this.correctionApi.updateCorrection(action.updateCorrectionPayload).pipe(
        map(status => updateCorrectionSuccess({status})),
        tap( () => this.user.loadUser() ),
        catchError(error => of(updateCorrectionFail({error: error.message}))),
      );
    })
  ));


  createCorrection$ = createEffect(() => this.actions$.pipe(
    ofType(createCorrection),
    switchMap( action => {
      return this.correctionApi.createCorrection(action.createCorrectionPayload).pipe(
        map(status => createCorrectionSuccess({status})),
        catchError(error => of(createCorrectionFail({error: error.message}))),
      );
    })
  ));
}
