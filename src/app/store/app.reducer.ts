import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State } from './app.state';
import { storeFreeze } from 'ngrx-store-freeze';
import { loginReducer } from '../components/login/store/login.reducer';
import { surveyReducer } from '../components/visit/store/survey.reducer';
import { profileReducer } from '../components/profile/store/profile.reducer';
import { correctionReducer } from '../components/action-corrective/store/correction.reducer';
import { layoutReducer } from './layout/layout.reducer';
import { dataReducer } from './data/data.reducer';
import { dangerousReducer } from '../components/dangerous/store/dangerous.reducer';
import { historyReducer } from '../components/history/store/history.reducer';
import { localStorageSyncReducer } from '../data/local-storage.helpers';
import { draftReducer } from './draft/draft.reducer';
import { menuReducer } from '../components/shared/components/menu/store/menu.reducer';

export const reducers: ActionReducerMap<State> = {
    dangerous: dangerousReducer,
    data: dataReducer,
    draft: draftReducer,
    history: historyReducer,
    layout: layoutReducer,
    login: loginReducer,
    menu: menuReducer,
    profile: profileReducer,
    correction: correctionReducer,
    survey: surveyReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];
