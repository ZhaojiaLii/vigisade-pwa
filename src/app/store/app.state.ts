import {LoginState} from '../components/login/store/login.state';
import { CreateResultState, GetResultsState, GetResultState, SurveyState, UpdateResultState } from '../components/visit/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';

export interface State {
    login: LoginState;
    survey: SurveyState;
    result: GetResultState;
    results: GetResultsState;
    create: CreateResultState;
    update: UpdateResultState;
    profile: ProfileState;
}
