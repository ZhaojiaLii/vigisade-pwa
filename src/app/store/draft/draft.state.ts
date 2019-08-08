import { ResultDraft } from '../../components/survey/interfaces/results/result-draft.interface';

export interface DraftState {
  survey: ResultDraft;
}

export const draftInitialState: DraftState = {
  survey: null,
};
