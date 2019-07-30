import { StoreModule } from '@ngrx/store';
import { draftReducer } from './draft.reducer';

export const draftFeature = [
  StoreModule.forFeature('draft', draftReducer),
];
