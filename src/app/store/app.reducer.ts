import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { State } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import {loginReducer} from '../components/login/store/login.reducer';
import {
    createResultReducer,
    getResultReducer,
    getResultsReducer,
    openMenuReducer,
    surveyReducer,
    updateResultReducer
} from '../components/visit/store/survey.reducer';
import { profileGetUserReducer } from '../components/profile/store/profile.reducer';
import {
    createCorrectionReducer, getCorrectionReducer,
    updateCorrectionReducer
} from '../components/action-corrective/store/correction.reducer';

export const reducers: ActionReducerMap<State> = {
    login: loginReducer,
    survey: surveyReducer,
    result: getResultReducer,
    results: getResultsReducer,
    createResult: createResultReducer,
    updateResult: updateResultReducer,
    createCorrection: createCorrectionReducer,
    updateCorrection: updateCorrectionReducer,
    correction: getCorrectionReducer,
    menu: openMenuReducer,
    profile: profileGetUserReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
