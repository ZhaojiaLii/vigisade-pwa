import { StoreModule } from '@ngrx/store';
import { menuReducer } from './menu.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './menu.effects';

export const menuFeature = [
  StoreModule.forFeature('menu', menuReducer),
  EffectsModule.forFeature([MenuEffects]),
];
