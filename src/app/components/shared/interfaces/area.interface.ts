import { Entity } from './entity.interface';

export interface Area {
  id: number;
  directionId: number;
  name: string;
  entities: Entity[];
}
