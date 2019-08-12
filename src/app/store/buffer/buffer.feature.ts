import { EffectsModule } from '@ngrx/effects';
import { BufferEffects } from './buffer.effects';

export const bufferFeature = [
  EffectsModule.forFeature([BufferEffects]),
];
