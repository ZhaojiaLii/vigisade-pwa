import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectSurveyCategory, setLoadingState } from '../../components/survey/store/survey.actions';
import { switchMap, tap, withLatestFrom, filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { addResultToBuffer, delayResultCreation } from './buffer.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { getBufferResults } from './buffer.selectors';
import { BufferState } from './buffer.state';
import { Result } from '../../components/survey/interfaces/results/result.interface';
import { select, Store } from '@ngrx/store';

@Injectable()
export class BufferEffects {

  createResultDelayed$ = createEffect(() => this.actions$.pipe(
    ofType(delayResultCreation),
    switchMap((action) => from(this.router.navigate(['/home'])).pipe(
      tap(() => this.toastr.warning(
        'Impossible de se connecter au serveur. Connectez-vous à Interne pour sauvegarder automatiquement la visite.'
      )),
      switchMap(() => [
        setLoadingState({loading: false}),
        selectSurveyCategory({id: null}),
        addResultToBuffer({result: action.result})
      ]),
    )),
  ));

  retryCreateResult$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    withLatestFrom(
      this.store.pipe(select(getBufferResults)),
    ),
    filter(([action, results]: [RouterNavigationAction, Result[]]) => results && results.length > 0),
    tap(([action, results]: [RouterNavigationAction, Result[]]) => {
      console.log('Results to sync:', results);
      navigator.serviceWorker.ready.then(swRegistration => {
        console.log('SW is ready to sync:', swRegistration);
        if (swRegistration) {
          swRegistration.sync.register('sync_surveys');
        }
      });
    }),
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private store: Store<BufferState>,
    private router: Router,
    private toastr: ToastrService,
  ) {}
}
