import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { CorrectionState } from '../components/action-corrective/store/correction.states';
import { LayoutState } from './layout/layout.state';
import { DataState } from './data/data.state';

export interface State {
    data: DataState;
    layout: LayoutState;
    login: LoginState;
    profile: ProfileState;
    correction: CorrectionState;
    survey: SurveyState;
}


