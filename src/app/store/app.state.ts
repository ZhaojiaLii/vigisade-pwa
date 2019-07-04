import {LoginState} from '../components/login/store/login.state';
import {
    CreateResultState,
    GetResultsState,
    GetResultState, OpenMenuState,
    SurveyState,
    UpdateResultState
} from '../components/visit/store/survey.state';
import {ProfileState} from '../components/profile/store/profile.state';
import {
    CreateCorrectionState,
    GetCorrectionState,
    UpdateCorrectionState
} from '../components/action-corrective/store/correction.states';

export interface State {
    login: LoginState;
    survey: SurveyState;
    result: GetResultState;
    results: GetResultsState;
    createResult: CreateResultState;
    updateResult: UpdateResultState;
    createCorrection: CreateCorrectionState;
    updateCorrection: UpdateCorrectionState;
    correction: GetCorrectionState;
    profile: ProfileState;
    menu: OpenMenuState;
}
