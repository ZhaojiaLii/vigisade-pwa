import { Direction } from '../../components/shared/interfaces/direction.interface';
import { DangerousType } from '../../components/dangerous/interfaces/dangerous-type.interface';

export interface DataApi {
  direction: Direction[];
  typeDangerousSituations: DangerousType[];
}
