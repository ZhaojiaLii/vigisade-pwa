import { StoreModule } from '@ngrx/store';
import { dataReducer } from './data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './data.effects';

export const dataFeature = [
  StoreModule.forFeature('data', dataReducer),
  EffectsModule.forFeature([DataEffects]),
];
