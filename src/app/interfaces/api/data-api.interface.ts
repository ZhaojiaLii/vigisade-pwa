import { Direction } from '../../components/shared/interfaces/direction.interface';
import { DangerousSituationType } from '../../components/dangerous/interfaces/dangerous-situation-type.interface';

export interface DataApi {
  direction: Direction[];
  typeDangerousSituations: DangerousSituationType[];
}
