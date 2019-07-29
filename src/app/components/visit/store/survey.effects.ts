import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SurveyApiService } from '../services/survey-api.service';
import { createResult, createResultFail, createResultSuccess, loadSurveys, loadSurveysFail, loadSurveysSuccess, setLoadingState, updateResult, updateResultFail, updateResultSuccess } from './survey.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { SurveyService } from '../services/survey.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class SurveyEffects {

  constructor(
    private actions$: Actions,
    private service: SurveyService,
    private api: SurveyApiService,
    private router: Router,
    private toast: ToastrService,
  ) {}

  loadSurveys$ = createEffect(() => this.actions$.pipe(
    ofType(loadSurveys),
    switchMap(() => {
      return this.api.getSurveys().pipe(
        map(surveys => loadSurveysSuccess({surveys})),
        catchError(error => of(loadSurveysFail({error: error.message}))),
      );
    })
  ));

  createResult$ = createEffect(() => this.actions$.pipe(
      ofType(createResult),
      switchMap(action => {
          return this.api.createResult(action.payload).pipe(
              map(status => createResultSuccess({status})),
              catchError(error => of(createResultFail({error: error.message}))),
          );
      })
  ));

  createResultSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(createResultSuccess),
    switchMap(() => from(this.router.navigate(['/home'])).pipe(
      tap(() => this.toast.success('Visite validée.')),
    )),
    map(() => setLoadingState({loading: false}))
  ));

  createResultFail$ = createEffect(() => this.actions$.pipe(
    ofType(createResultFail),
    tap(() => this.toast.error('La validation a échouée. Veuillez réessayer dans quelque instant.')),
    map(() => setLoadingState({loading: false}))
  ));

  updateResult$ = createEffect(() => this.actions$.pipe(
      ofType(updateResult),
      switchMap(action => {
          return this.api.updateResult(action.updateResultPayload).pipe(
              map(status => updateResultSuccess({status})),
              catchError(error => of(updateResultFail({error: error.message}))),
          );
      })
  ));
}
