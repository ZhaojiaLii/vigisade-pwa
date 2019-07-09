import { StoreModule } from '@ngrx/store';
import { layoutReducer } from './layout.reducer';

export const layoutFeature = [
  StoreModule.forFeature('layout', layoutReducer),
];
