import { StoreModule } from '@ngrx/store';
import { surveyReducer } from './survey.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SurveyEffects } from './survey.effects';

export const surveyFeature = [
  StoreModule.forFeature('survey', surveyReducer),
  EffectsModule.forFeature([SurveyEffects]),
];
