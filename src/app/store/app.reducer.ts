import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { State } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import {loginReducer} from '../components/login/store/login.reducer';
import { createResultReducer, getResultReducer, getResultsReducer, surveyReducer, updateResultReducer } from '../components/visit/store/survey.reducer';
import { profileGetUserReducer } from '../components/profile/store/profile.reducer';

export const reducers: ActionReducerMap<State> = {
    login: loginReducer,
    survey: surveyReducer,
    result: getResultReducer,
    results: getResultsReducer,
    create: createResultReducer,
    update: updateResultReducer,
    profile: profileGetUserReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
