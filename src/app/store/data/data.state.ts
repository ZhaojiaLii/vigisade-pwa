import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Header } from '../../interfaces/header.interface';
import { DangerousSituationType } from '../../components/dangerous/interfaces/dangerous-situation-type.interface';

export interface DataState {
  direction: Direction[];
  header: Header;
  typeDangerousSituations: DangerousSituationType[];
}

export const initialDataState = {
  direction: [],
  header: null,
  typeDangerousSituations: [],
};
