import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Header } from '../../interfaces/header.interface';
import { DangerousType } from '../../components/dangerous/interfaces/dangerous-type.interface';

export interface DataState {
  direction: Direction[];
  header: Header;
  typeDangerousSituations: DangerousType[];
}

export const initialDataState = {
  direction: [],
  header: null,
  typeDangerousSituations: [],
};
