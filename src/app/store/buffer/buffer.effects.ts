import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectSurveyCategory, setLoadingState } from '../../components/survey/store/survey.actions';
import { switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { addResultToBuffer, delayResultCreation } from './buffer.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BufferState } from './buffer.state';
import { Store } from '@ngrx/store';

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

  constructor(
    private actions$: Actions,
    private store: Store<BufferState>,
    private router: Router,
    private toastr: ToastrService,
  ) {}
}
