import { StoreModule } from '@ngrx/store';
import { bufferReducer } from './buffer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BufferEffects } from './buffer.effects';

export const bufferFeature = [
  StoreModule.forFeature('buffer', bufferReducer),
  EffectsModule.forFeature([BufferEffects]),
];
