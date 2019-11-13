import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, filter, mergeMap, catchError } from 'rxjs/operators';
import { delayPost, replayPost, replayPostError, replayPostSuccess } from './buffer.actions';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { DelayedRequest } from '../../interfaces/delayed-request.interface';
import { BufferService } from '../../services/buffer.service';
import { BufferApiService } from '../../services/api/buffer-api.service';
import { of } from 'rxjs';
import { ProfileService } from '../../components/profile/services/profile.service';
import { SurveyService } from '../../components/survey/services/survey.service';
import { HistoryService } from '../../components/history/services/history.service';

@Injectable()
export class BufferEffects {

  delayPost$ = createEffect(() => this.actions$.pipe(
    ofType(delayPost),
    tap(action => {
      let delayedRequests: any = window.localStorage.getItem('vigisade');

      if (delayedRequests) {
        delayedRequests = [...JSON.parse(delayedRequests), action.request];
      } else {
        delayedRequests = [action.request];
      }

      window.localStorage.setItem('vigisade', JSON.stringify(delayedRequests));
    })
  ), {dispatch: false});

  replayPosts$ = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    filter(() => window.navigator.onLine && !!window.localStorage.getItem('vigisade')),
    tap(() => {
      const delayedRequests: DelayedRequest[] = JSON.parse(window.localStorage.getItem('vigisade'));

      delayedRequests.forEach(delayedRequest => {
        this.bufferService.replayPost(delayedRequest);
      });
    }),
  ), {dispatch: false});

  replayPost$ = createEffect(() => this.actions$.pipe(
    ofType(replayPost),
    mergeMap(action => this.api.postDelayedRequest(action.delayedRequest).pipe(
      map(() => replayPostSuccess({id: action.delayedRequest.id})),
      catchError(error => of(replayPostError({error: error.message}))),
    )),
  ));

  replayPostSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(replayPostSuccess),
    tap(action => {
      const delayedRequests: any = window.localStorage.getItem('vigisade');

      if (delayedRequests) {
        window.localStorage.setItem(
          'vigisade',
          JSON.stringify(JSON.parse(delayedRequests).filter(request => request.id !== action.id)),
        );
      }
    }),
    tap(() => {
      this.surveyService.loadSurveys();
      this.historyService.loadHistory();
      this.profileService.loadUser();
    })
  ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private bufferService: BufferService,
    private api: BufferApiService,
    private profileService: ProfileService,
    private surveyService: SurveyService,
    private historyService: HistoryService,
  ) {}
}
