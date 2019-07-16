import { CreateDangerousSituation } from '../interfaces/create-dangerous-situation.interface';

export interface DangerousState {
  unsavedDangerousSituations: CreateDangerousSituation[];
}

export const dangerousInitialState = {
  unsavedDangerousSituations: [],
};
