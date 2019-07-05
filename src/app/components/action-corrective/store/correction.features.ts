import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {createCorrectionReducer, getCorrectionReducer, updateCorrectionReducer} from './correction.reducer';
import {CorrectionEffects} from './correction.effects';

export const getCorrectionFeature = [
  StoreModule.forFeature('getCorrection', getCorrectionReducer),
  EffectsModule.forFeature([CorrectionEffects]),
];

export const updateCorrectionFeature = [
  StoreModule.forFeature('updateCorrection', updateCorrectionReducer),
  EffectsModule.forFeature([CorrectionEffects]),
];

export const createCorrectionFeature = [
  StoreModule.forFeature('createCorrection', createCorrectionReducer),
  EffectsModule.forFeature([CorrectionEffects]),
];

