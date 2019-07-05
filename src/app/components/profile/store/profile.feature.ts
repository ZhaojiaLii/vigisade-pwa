import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './profile.effects';
import { profileReducer } from './profile.reducer';


export const profileFeature = [
  StoreModule.forFeature('profile', profileReducer),
  EffectsModule.forFeature([ProfileEffects]),
];
