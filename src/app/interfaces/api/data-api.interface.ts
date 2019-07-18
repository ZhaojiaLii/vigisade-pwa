import { Direction } from '../../components/shared/interfaces/direction.interface';
import { Area } from '../../components/shared/interfaces/area.interface';
import { Entity } from '../../components/shared/interfaces/entity.interface';
import { DangerousType } from '../../components/dangerous/interfaces/dangerous-type.interface';

export interface DataApi {
  directions: Direction[];
  areas: Area[];
  entities: Entity[];
  dangerousTypes: DangerousType[];
}
