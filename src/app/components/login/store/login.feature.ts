import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './login.effects';

export const loginFeature = [
  StoreModule.forFeature('login', loginReducer),
  EffectsModule.forFeature([LoginEffects]),
];
