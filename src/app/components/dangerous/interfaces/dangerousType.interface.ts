import { DangerousTypeTranslation } from './dangerousTypeTranslation.interface';

export interface DangerousType {
  dangerousTypeId: number;
  dangerousTypeTranslation: DangerousTypeTranslation[];
}
