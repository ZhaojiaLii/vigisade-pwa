export interface User {
  id: number;
  mail: string;
  directionId: number;
  areaId: number;
  entityId: number;
  firstName: string;
  lastName: string;
  language?: string;
  photo: string;
  countRemainingActions: number;
  countCurrentMonthVisits: number;
  countLastMonthVisits: number;
}
