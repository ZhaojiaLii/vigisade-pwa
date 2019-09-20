import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';
import { DangerousSituationHistory } from '../interfaces/dangerous-situation-history.interface';
import { DangerousSearch } from '../../history-dangerous/interfaces/dangerous-search.interface';

export interface DangerousState {
  loading: boolean;
  unsavedDangerousSituations: {
    id: string;
    dangerousSituation: DangerousSituationPayload
  }[];
  dangerousHistory: DangerousSituationHistory[];
  search: DangerousSearch;
}

export const dangerousInitialState = {
  loading: false,
  unsavedDangerousSituations: [],
  dangerousHistory: null,
  search: null,
};
