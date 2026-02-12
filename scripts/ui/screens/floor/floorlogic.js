import { getstate } from "../../../game_content/SaveManager/savemange.js";
import { distanceHelper, floormaps, TILE_DEF } from "../../../logic/map/maps.js";

// Radius means "tiles away from player"
const VISIBLE_RADIUS = 2; // 5x5 (full info, aggro)
const SHADOW_RADIUS  = 3; // 7x7 (silhouette only)
const LOGIC_RADIUS   = 4; // 9x9 (AI only, NEVER rendered)


export function renderViewPointUI() {
  const grid = [];

  const state = getstate();
  console.log("map state", state);
  const { position } = state;

  const { x:px , y:py, floor} = position;
  const currentMap = floormaps[floor];

  for (let y = -SHADOW_RADIUS; y <= SHADOW_RADIUS; y++) {
    const row = [];

    for (let x = -SHADOW_RADIUS; x <= SHADOW_RADIUS; x++) {
      const tx = px + x;
      const ty = py + y;

      const symbol = currentMap?.[ty]?.[tx]?.[0] ?? null;
      const tile   = symbol ? TILE_DEF[symbol] : null;
      const clarity = getClarity(px, py, tx, ty);

      if (clarity === "visible") {
        playerMemory.set(memKey(tx, ty), {
          symbol,
          entity: getEntityAt(tx, ty)
            ? structuredClone(getEntityAt(tx, ty))
            : null
        });
      }
      
      row.push({
        x: tx,
        y: ty,
        symbol,
        tile,
        clarity,
      });
    }
    console.log("grid", grid);
    grid.push(row);
  }

  return grid;
}

export function canMove(px, py, tileData) {
  // Can only move to FULLY visible tiles
  if (tileData.clarity !== "visible") return false;

  // Only 1-tile movement
  const d = distance(player.x, player.y, tileData.x, tileData.y);
  if (d !== 1) return false;

  // Must be passable
  return tileData.tile?.passable ?? false;
}

export function renderTile(tileData) {
  const div = document.createElement("div");
  div.className = "tile";

  const memory = playerMemory.get(memKey(tileData.x, tileData.y));

  // HIDDEN → unknown void
  if (tileData.clarity === "hidden") {
    div.classList.add("void");
    return div;
  }

  // SHADOW → remembered state
  if (tileData.clarity === "shadow") {
    div.classList.add("shadow");

    if (memory?.entity) {
      // last known monster/chest silhouette
      div.textContent = "?";
    } else if (memory?.symbol) {
      div.classList.add(memory.symbol);
    } else {
      div.textContent = "■";
    }

    return div;
  }

  // VISIBLE → real-time truth
  if (tileData.clarity === "visible") {
    console.log("td", tileData);
    div.classList.add(tileData.symbol ?? "floor");
  }

  return div;
}





function shouldAggro(monster, player) {
  return (
    distance(monster.x, monster.y, player.x, player.y)
    <= VISIBLE_RADIUS
  );
}


function getLogicArea(map, player) {
  const tiles = [];

  for (let y = -LOGIC_RADIUS; y <= LOGIC_RADIUS; y++) {
    for (let x = -LOGIC_RADIUS; x <= LOGIC_RADIUS; x++) {
      const tx = player.x + x;
      const ty = player.y + y;

      tiles.push({
        x: tx,
        y: ty,
        symbol: map[ty]?.[tx]?.[0] ?? null,
      });
    }
  }

  return tiles;
}


// Determines how much information the player gets about a tile
function getClarity(px, py, tx, ty) {
  const d = distanceHelper(px, py, tx, ty);

  if (d <= VISIBLE_RADIUS) return "visible"; // full info
  if (d <= SHADOW_RADIUS)  return "shadow";  // silhouette only
  return "hidden"; // NOT rendered at all
}


function memKey(floor, x, y) {
  return `${floor}:${x},${y}`;
}

const playerMemory = new Map();


export function getEntityAt(x, y) {
  const state = getstate();
  const floorIndex = state.position.floor - 1;

  const floor = floormaps[floorIndex];
  if (!floor) return null;

  const symbol = floor[y]?.[x]?.[0];
  if (!symbol) return null;

  switch (symbol) {
    case "m":
      return {
        type: "monster",
        floor: state.position.floor,
        x, y,
      };

    case "c":
      return {
        type: "chest",
        floor: state.position.floor,
        x, y,
      };

    case "u":
      return {
        type: "stairs-up",
        floor: state.position.floor,
        x, y,
      };

    case "d":
      return {
        type: "stairs-down",
        floor: state.position.floor,
        x, y,
      };

    default:
      return null; // b or unknown
  }
}