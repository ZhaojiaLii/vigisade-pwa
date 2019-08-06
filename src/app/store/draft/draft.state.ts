import { ResultDraft } from '../../components/visit/interfaces/results/result-draft.interface';

export interface DraftState {
  survey: ResultDraft;
}

export const draftInitialState: DraftState = {
  survey: null,
};
