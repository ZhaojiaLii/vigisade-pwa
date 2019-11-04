import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  createDangerousSituation,
  createDangerousSituationFail,
  createDangerousSituationSuccess,
  loadHistoryDangerous,
  loadHistoryDangerousFail,
  loadHistoryDangerousSuccess,
  setLoadingState,
} from './dangerous.action';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DangerousSituationApiService } from '../services/dangerous-situation-api.service';
import { from, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DangerousService } from '../services/dangerous.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getRandomId } from '../../../data/random.helpers';
import { BufferService } from '../../../services/buffer.service';

@Injectable()
export class DangerousEffects {

  constructor(
    private actions$: Actions,
    private dangerousApiService: DangerousSituationApiService,
    private dangerousService: DangerousService,
    private router: Router,
    private toastr: ToastrService,
    private bufferService: BufferService,
    private translateService: TranslateService,
  ) {}

  createDangerous$ = createEffect(() => this.actions$.pipe(
    ofType(createDangerousSituation),
    switchMap(action => {
      return this.dangerousApiService.postDangerous(action.dangerousSituation).pipe(
        map(status => createDangerousSituationSuccess({status})),
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 0) {
            this.bufferService.delayPost({
              id: getRandomId(),
              url: '/api/dangerous-situation/create/',
              payload: action.dangerousSituation,
            });

            // return of(createDangerousSituationSuccess({status: 200}));
          }
          return of(createDangerousSituationFail({
            error: error.message,
            dangerousSituation: action.dangerousSituation
          }));
        }
        ),
        tap(() => this.toastr.error(this.translateService.instant('SituationDangereuse.Situation dangereuse synchronisee')))
      );
    })
  ));

  createDangerousStart$ = createEffect(() => this.actions$.pipe(
    ofType(createDangerousSituation),
    map(() => setLoadingState({loading: true})),
  ));

  createDangerousSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createDangerousSituationSuccess),
    switchMap(() => from(this.router.navigate(['/home'])).pipe(
      tap(() => this.toastr.success(this.translateService.instant('SituationDangereuse.Situation dangereuse crée'))),
      tap(() => this.dangerousService.loadDangerousHistory()),
    )),
    map(() => setLoadingState({loading: false})),
  ));

  createDangerousFail$ = createEffect(() => this.actions$.pipe(
    ofType(createDangerousSituationFail),
    tap(() => this.toastr.error(this.translateService.instant('SituationDangereuse.Situation dangereuse synchronisee'))),
    map(() => setLoadingState({loading: false})),
  ));

  loadDangerousHistory$ = createEffect(() => this.actions$.pipe(
    ofType(loadHistoryDangerous),
    switchMap(() => {
      return this.dangerousApiService.loadDangerousHistory().pipe(
        map(dangerousHistory => loadHistoryDangerousSuccess({dangerousHistory})),
        catchError(error => of(loadHistoryDangerousFail({error: error.message}))),
      );
    })
  ));
}
