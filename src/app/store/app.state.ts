import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { LayoutState } from './layout/layout.state';

export interface State {
    layout: LayoutState,
    login: LoginState;
    profile: ProfileState;
    survey: SurveyState;
}
