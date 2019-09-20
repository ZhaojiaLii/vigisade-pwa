import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';
import { DangerousSituationHistory } from '../interfaces/dangerous-situation-history.interface';

export interface DangerousState {
  loading: boolean;
  unsavedDangerousSituations: {
    id: string;
    dangerousSituation: DangerousSituationPayload
  }[];
  dangerousHistory: DangerousSituationHistory[];
}

export const dangerousInitialState = {
  loading: false,
  unsavedDangerousSituations: [],
  dangerousHistory: null,
};
