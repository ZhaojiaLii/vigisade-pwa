import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { CorrectionState } from '../components/action-corrective/store/correction.states';

export interface State {
    login: LoginState;
    survey: SurveyState;
    profile: ProfileState;
    correction: CorrectionState;
}
