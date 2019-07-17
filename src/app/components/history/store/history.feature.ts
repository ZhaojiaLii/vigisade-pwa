import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { historyReducer } from './history.reducer';
import { HistoryEffects } from './history.effects';

export const historyFeature = [
  StoreModule.forFeature('history', historyReducer),
  EffectsModule.forFeature([HistoryEffects]),
];
