import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Area } from '../../components/shared/interfaces/area.interface';
import { Entity } from '../../components/shared/interfaces/entity.interface';
import { Header } from '../../interfaces/header.interface';
import { DangerousType } from '../../components/dangerous/interfaces/dangerous-type.interface';

export interface DataState {
  directions: Direction[];
  areas: Area[];
  entities: Entity[];
  header: Header;
  dangerousTypes: DangerousType[];
}

export const initialDataState = {
  directions: [],
  areas: [],
  entities: [],
  header: null,
  dangerousTypes: [],
};
