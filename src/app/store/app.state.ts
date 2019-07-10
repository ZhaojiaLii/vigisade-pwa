import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { LayoutState } from './layout/layout.state';
import { DataState } from './data/data.state';

export interface State {
    data: DataState;
    layout: LayoutState;
    login: LoginState;
    profile: ProfileState;
    survey: SurveyState;
}
