import { Direction } from '../components/shared/interfaces/direction.interface';
import { Area } from '../components/shared/interfaces/area.interface';

/**
 * Gets default area and entity from a direction ID.
 */
export const getDefaultFromDirectionId = (
  directions: Direction[],
  directionId: number
): {areaId: number, entityId: number} => {
  const searchedDirection = directions
    .find(direction => direction.id === directionId);

  if (!searchedDirection) {
    return {areaId: null, entityId: null};
  }

  return getDefaultFromDirection(searchedDirection);
};

/**
 * Gets default area and entity from a direction.
 */
export const getDefaultFromDirection = (
  direction: Direction
): {areaId: number, entityId: number} => {
  const area = getDefaultAreaFromDirection(direction);

  if (!area) {
    return {areaId: null, entityId: null};
  }

  return {
    areaId: area.id,
    ...getDefaultFromArea(area),
  };
};

/**
 * Gets default entity for an area.
 */
export const getDefaultFromArea = (area: Area): {entityId: number} => {
  if (!area) {
    return {entityId: null};
  }

  const entity = getDefaultEntityFromArea(area);

  return {entityId: entity ? entity.id : null,};
};

/**
 * Gets default entity for an area ID.
 */
export const getDefaultFromAreaId = (areas: Area[], areaId: number): {entityId: number} => {
  const searchedArea = areas
    .find(area => area.id === areaId);

  if (!searchedArea) {
    return {entityId: null};
  }

  return getDefaultFromArea(searchedArea);
};

export const getDefaultAreaFromDirection = (direction: Direction) => {
  return direction && direction.area && direction.area.length > 0
    ? direction.area[0]
    : null;
};

export const getDefaultEntityFromArea = (area: Area) => {
  return area && area.entity && area.entity.length > 0
    ? area.entity[0]
    : null;
};
