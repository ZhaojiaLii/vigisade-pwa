import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import { loginReducer } from '../components/login/store/login.reducer';
import { surveyReducer } from '../components/visit/store/survey.reducer';
import { profileReducer } from '../components/profile/store/profile.reducer';
import { correctionReducer } from '../components/a-traiter/action-corrective/store/correction.reducer';
import { layoutReducer } from './layout/layout.reducer';

export const reducers: ActionReducerMap<State> = {
    layout: layoutReducer,
    login: loginReducer,
    profile: profileReducer,
    correction: correctionReducer,
    survey: surveyReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
