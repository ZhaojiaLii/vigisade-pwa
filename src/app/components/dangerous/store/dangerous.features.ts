import { StoreModule } from '@ngrx/store';
import { dangerousReducer } from './dangerous.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DangerousEffects } from './dangerous.effects';

export const dangerousFeature = [
  StoreModule.forFeature('dangerous', dangerousReducer),
  EffectsModule.forFeature([DangerousEffects]),
];
