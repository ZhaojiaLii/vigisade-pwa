import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Header } from '../../interfaces/header.interface';
import { DangerousType } from '../../components/dangerous/interfaces/dangerous-type.interface';

export interface DataState {
  directions: Direction[];
  header: Header;
  dangerousTypes: DangerousType[];
}

export const initialDataState = {
  directions: [],
  header: null,
  dangerousTypes: [],
};
