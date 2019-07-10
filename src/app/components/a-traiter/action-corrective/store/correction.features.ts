import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {correctionReducer} from './correction.reducer';
import {CorrectionEffects} from './correction.effects';

export const correctionFeature = [
  StoreModule.forFeature('correction', correctionReducer),
  EffectsModule.forFeature([CorrectionEffects]),
];


