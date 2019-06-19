import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { State } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import {loginReducer} from '../components/login/store/login.reducer';

export const reducers: ActionReducerMap<State> = {
    login: loginReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
