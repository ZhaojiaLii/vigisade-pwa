import { DangerousSituationPayload } from '../interfaces/create/dangerous-situation.interface';

export interface DangerousState {
  loading: boolean;
  unsavedDangerousSituations: {
    id: string;
    dangerousSituation: DangerousSituationPayload
  }[];
}

export const dangerousInitialState = {
  loading: false,
  unsavedDangerousSituations: [],
};
