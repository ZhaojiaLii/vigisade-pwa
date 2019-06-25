import {LoginState} from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';

export interface State {
    login: LoginState;
    survey: SurveyState;
    profile: ProfileState;
}
