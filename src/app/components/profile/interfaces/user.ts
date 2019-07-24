export interface User {
  id: number;
  mail: string;
  directionId: number;
  areaId: number;
  entityId: number;
  firstName: string;
  lastName: string;
  photo: string;
  language: string;
  countRemainingActions: number;
  countCurrentMonthVisits: number;
  countLastMonthVisits: number;
}
