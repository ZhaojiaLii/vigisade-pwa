import {LoginState} from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';

export interface State {
    login: LoginState;
    survey: SurveyState;
}
