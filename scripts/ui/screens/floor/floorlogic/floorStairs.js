import { generateId } from "../../../../logic/utils/generateId.js";

export function createStairs({
  type = "u",        // "u" | "d" | "p"
  toFloor = null,    // null = relative movement
  x = 0,
  y = 0,
  direction = "down",
}) {

  if (!["u", "d", "p"].includes(type)) {
    throw new Error("createStairs: invalid type");
  }

  return {
    id: generateId(),
    tile: type,        
    toFloor,           
    spawn: { x, y },  
    direction,         
  };
}
