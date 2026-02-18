import { distanceHelper } from "../map/maps.js";

export function canMove(px, py, tx, ty, passable) {
  const d = distanceHelper(px, py, tx, ty);
  if (d !== 1) return false;

  return passable ?? false;
}