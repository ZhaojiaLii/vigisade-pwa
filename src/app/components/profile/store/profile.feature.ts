import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './profile.effects';
import { profileGetUserReducer } from './profile.reducer';


export const profileFeature = [
  StoreModule.forFeature('profile', profileGetUserReducer),
  EffectsModule.forFeature([ProfileEffects]),
];
