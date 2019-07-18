import { Entity } from './entity.interface';

export interface Area {
  id: number;
  direction: number;
  name: string;
  entity: Entity[];
}
