import { StoreModule } from '@ngrx/store';
import { getResultReducer, getResultsReducer, surveyReducer } from './survey.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SurveyEffects } from './survey.effects';

export const surveyFeature = [
  StoreModule.forFeature('survey', surveyReducer),
  EffectsModule.forFeature([SurveyEffects]),
];

export const getResultsFeature = [
  StoreModule.forFeature('results', getResultsReducer),
  EffectsModule.forFeature([SurveyEffects]),
];

export const getResultFeature = [
  StoreModule.forFeature('result', getResultReducer),
  EffectsModule.forFeature([SurveyEffects]),
];
