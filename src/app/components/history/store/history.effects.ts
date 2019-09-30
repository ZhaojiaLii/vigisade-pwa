import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  goToNextCategory,
  loadHistory,
  loadHistoryFail,
  loadHistorySuccess,
  loadResult,
  loadResultFail,
  loadResultSuccess,
  selectCategory
} from './history.actions';
import { HistoryApiService } from '../services/history-api.service';
import { of } from 'rxjs';
import { SurveyService } from '../../survey/services/survey.service';
import { HistoryService } from '../services/history.service';
import { GOOD_PRACTICE_CATEGORY_ID } from '../../survey/interfaces/getResultInterface/bestPractice.interface';

@Injectable()
export class HistoryEffects {

  constructor(
    private actions$: Actions,
    private surveyService: SurveyService,
    private historyService: HistoryService,
    private api: HistoryApiService,
  ) {}

  loadHistory$ = createEffect(() => this.actions$.pipe(
    ofType(loadHistory),
    switchMap(() => {
      return this.api.getHistory().pipe(
        map(history => {
          return loadHistorySuccess({history});
        }),
        catchError(error => of(loadHistoryFail({error: error.message}))),
      );
    })
  ));

  loadResult$ = createEffect(() => this.actions$.pipe(
    ofType(loadResult),
    switchMap(action => {
      return this.api.getResult(action.id).pipe(
        map(result => loadResultSuccess({result})),
        catchError(error => of(loadResultFail({error: error.message}))),
      );
    })
  ));

  nextCategory$ = createEffect(() => this.actions$.pipe(
    ofType(goToNextCategory),
    withLatestFrom(
      this.surveyService.getSurveyOfUser(),
      this.historyService.getSelectedCategory(),
    ),
    map(([action, survey, selectedCategory]) => {
      if (
        !survey
        || !survey.surveyCategories
        || survey.surveyCategories.length === 0
      ) {
        return selectCategory({id: null});
      }
      if (!selectedCategory) {
        return selectCategory({id: survey.surveyCategories[0].surveyCategoryId});
      } else if (selectedCategory.surveyCategoryId === GOOD_PRACTICE_CATEGORY_ID) {
        return selectCategory({id: GOOD_PRACTICE_CATEGORY_ID});
      }

      const currentCategoryIndex = survey.surveyCategories
        .findIndex(category => category.surveyCategoryId === selectedCategory.surveyCategoryId);
      if (survey.surveyCategories.length > (currentCategoryIndex + 1)) {
        return selectCategory({
          id: survey.surveyCategories[currentCategoryIndex + 1].surveyCategoryId,
        });
      } else {
        return selectCategory({id: GOOD_PRACTICE_CATEGORY_ID});
      }
    })
  ));
}
