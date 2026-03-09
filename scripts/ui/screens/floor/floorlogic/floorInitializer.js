import {
  getstate,
  setstate,
} from "../../../../core/SaveManager/savemange.js";
import { generateId } from "../../../../logic/utils/generateId.js";
import { distanceHelper, floormaps } from "../map/maps.js";
import { createChest } from "./floorChest.js";
import { createMonsterGroup } from "./floorMonster.js";
import { createStairs } from "./floorStairs.js";

 const VISIBLE_RADIUS = 2;
  const SHADOW_RADIUS = 3;


export function renderMapTiles() {
  const grid = [];
  const state = getstate();
  const { x: px, y: py, floor } = state.position;

 

  // Initialize memoryMap floor
  if (!state.memoryMap[floor]) {
    const initializedFloor = floormaps[floor].map((row) =>
      row.map((cell) => {
        const [symbol, meta = {}] = cell;

        // if add meta boss in boss;list ["m", {bossIndex}]
        if (symbol === "m") {
          return {
            id: generateId(),
            base: "floor",
            entity: createMonsterGroup(floor, meta),
            blocking: true,
            discovered: false,
          };
        }
        //meta 3 4 5 star chest rating
        if (symbol === "c") {
          return {
            id: generateId(),
            base: "floor",
            entity: createChest(floor, meta),
            blocking: false,
            discovered: false,
          };
        }

        if (symbol === "b") {
          return {
            base: "wall",
            entity: null,
            blocking: true,
            discovered: false,
          };
        }
        //add meta ["u", {x: 0, y: 0}] coord next floor
        if (symbol === "u") {
          return {
            base: "stairUp",
            entity: createStairs({type: "u", ...meta}),
            blocking: false,
            discovered: false,
          };
        }

        //add meta ["u", {direction, x: 0, y: 0}] coord next floor down
        if (symbol === "d") {
          return {
            base: "stairDown",
            entity: createStairs({type: "d", ...meta}),
            blocking: false,
            discovered: false,
          };
        }

        return {
          base: "floor",
          entity: null,
          blocking: false,
          discovered: false,
        };
      }),
    );

    setstate({
      ...state,
      memoryMap: {
        ...state.memoryMap,
        [floor]: initializedFloor,
      },
    });

    return renderMapTiles(); // re-run once initialized
  }

  const currentMap = state.memoryMap[floor];

  // Visibility Update (Immutable Batch)

  let changed = false;

  const updatedFloor = currentMap.map((row, y) =>
    row.map((tile, x) => {
      const clarity = getClarity(px, py, x, y);

      if (clarity === "visible" && !tile.discovered) {
        changed = true;
        return { ...tile, discovered: true };
      }

      return tile;
    }),
  );

  if (changed) {
    setstate({
      ...state,
      memoryMap: {
        ...state.memoryMap,
        [floor]: updatedFloor,
      },
    });
  }

  const finalMap = changed ? updatedFloor : currentMap;

  // Build Render Grid

  for (let dy = -SHADOW_RADIUS; dy <= SHADOW_RADIUS; dy++) {
    const row = [];

    for (let dx = -SHADOW_RADIUS; dx <= SHADOW_RADIUS; dx++) {
      const tx = px + dx;
      const ty = py + dy;

      const clarity = getClarity(px, py, tx, ty);
      const tile = finalMap?.[ty]?.[tx] ?? null;
      

      row.push({
        x: tx,
        y: ty,
        tile,
        clarity,
      });
    }

    console.log("current", currentMap);
    console.log("updatefloor", updatedFloor);
    console.log("grid", grid);
    grid.push(row);
  }

  return grid;
}

function getClarity(px, py, tx, ty) {
  const d = distanceHelper(px, py, tx, ty);

  if (d <= VISIBLE_RADIUS) return "visible"; // full info
  if (d <= SHADOW_RADIUS) return "shadow"; // silhouette only
  return "hidden"; // NOT rendered at all
}
