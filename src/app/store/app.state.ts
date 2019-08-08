import { LoginState } from '../components/login/store/login.state';
import { SurveyState } from '../components/survey/store/survey.state';
import { ProfileState } from '../components/profile/store/profile.state';
import { CorrectionState } from '../components/action-corrective/store/correction.states';
import { LayoutState } from './layout/layout.state';
import { DataState } from './data/data.state';
import { DangerousState } from '../components/dangerous/store/dangerous.states';
import { HistoryState } from '../components/history/store/history.state';
import { DraftState } from './draft/draft.state';
import { MenuState } from '../components/shared/components/menu/store/menu.state';
import { BufferState } from './buffer/buffer.state';

export interface State {
    buffer: BufferState;
    dangerous: DangerousState;
    data: DataState;
    draft: DraftState;
    history: HistoryState;
    layout: LayoutState;
    login: LoginState;
    menu: MenuState;
    profile: ProfileState;
    correction: CorrectionState;
    survey: SurveyState;
}


