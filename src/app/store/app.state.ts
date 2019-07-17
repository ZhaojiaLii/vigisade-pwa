import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { CorrectionState } from '../components/action-corrective/store/correction.states';
import { LayoutState } from './layout/layout.state';
import { DataState } from './data/data.state';
import { DangerousState } from '../components/dangerous/store/dangerous.states';
import { HistoryState } from '../components/history/store/history.state';

export interface State {
    dangerous: DangerousState;
    data: DataState;
    history: HistoryState,
    layout: LayoutState;
    login: LoginState;
    profile: ProfileState;
    correction: CorrectionState;
    survey: SurveyState;
}


