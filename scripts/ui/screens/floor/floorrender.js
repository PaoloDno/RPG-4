import { getstate } from "../../../game_content/SaveManager/savemange.js";
import {
  distanceHelper,
  floormaps,
  TILE_DEF,
} from "../../../logic/map/maps.js";

const VISIBLE_RADIUS = 2;
const SHADOW_RADIUS = 3;

export function renderMapTiles() {
  const grid = [];
  const state = getstate();

  const { position } = state;
  const { x: px, y: py, floor } = position;

  // Initialize memory map if not exists
  if (!state.memoryMap[floor]) {
    state.memoryMap[floor] = floormaps[floor].map((row) =>
      row.map((cell) => {
        const symbol = cell[0]; // because your map is [["m"]]

        // MONSTER TILE
        if (symbol === "m") {
          return {
            base: ".",
            entity: {
              type: "monster",
              enemies: [...runtimeMonsters],
              cleared: false,
            },
            discovered: false,
            blocking: true,
          };
        }

        // CHEST TILE
        if (symbol === "c") {
          return {
            base: ".",
            entity: createChest(),
            discovered: false,
            blocking: false,
          };
        }

        // WALL
        if (symbol === "b") {
          return {
            base: "wall",
            entity: null,
            discovered: false,
            blocking: true,
          };
        }

        // DEFAULT FLOOR
        return {
          base: ".",
          entity: null,
          discovered: false,
          blocking: false,
        };
      }),
    );
  }

  const currentMap = state.memoryMap[floor];

  for (let dy = -SHADOW_RADIUS; dy <= SHADOW_RADIUS; dy++) {
    const row = [];

    for (let dx = -SHADOW_RADIUS; dx <= SHADOW_RADIUS; dx++) {
      const tx = px + dx;
      const ty = py + dy;

      const clarity = getClarity(px, py, tx, ty);

      const symbol = currentMap?.[ty]?.[tx]?.[0] ?? null;
      const tile = TILE_DEF[symbol] ?? null;

      row.push({
        x: tx,
        y: ty,
        symbol,
        tile,
        clarity,
      });
    }

    grid.push(row);
  }
  console.log("memory_map", state.memoryMap);
  return grid;
}

function getClarity(px, py, tx, ty) {
  const d = distanceHelper(px, py, tx, ty);

  if (d <= VISIBLE_RADIUS) return "visible"; // full info
  if (d <= SHADOW_RADIUS) return "shadow"; // silhouette only
  return "hidden"; // NOT rendered at all
}

export function memoryKey(floor, x, y) {}

export function renderTile(tileData) {
  const state = getstate();

  const { position, memoryMap } = state;
  const { x: px, y: py, floor } = position;

  const div = document.createElement("div");
  div.className = "tile";

  if (tileData.symbol === null) {
    div.classList.add("off");
    return div;
  }

  if (tileData.x === px && tileData.y === py) {
    div.classList.add("player");
    return div;
  }

  // Hidden
  if (tileData.clarity === "hidden") {
    div.classList.add("hidden");
  } else if (tileData.clarity === "shadow") {
    div.classList.add("shadow");
  }

  div.classList.add(tileData?.tile?.kind);

  // Visible
  div.textContent = ""; // enforce no text
  div.classList.add(tileData.symbol ?? "off");

  return div;
}

export function canMove(px, py, tx, ty, passable) {
  const d = distanceHelper(px, py, tx, ty);
  if (d !== 1) return false;

  return passable ?? false;
}


function createMonsterGroup(floor = 1) {
  const groupSize = Math.floor(Math.random() * 3) + 1;

  const enemyKeys = Object.keys(enemyList);

  // Filter enemies that are allowed on this floor
  const available = enemyKeys.filter(key => {
    const e = enemyList[key];
    return !e.floor || floor >= e.floor;
  });

  // Safety fallback
  if (available.length === 0) {
    console.warn("No enemies available for floor:", floor);
    return {
      type: "monster",
      enemies: [],
      cleared: true
    };
  }

  const enemies = [];

  for (let i = 0; i < groupSize; i++) {
    const randomKey =
      available[Math.floor(Math.random() * available.length)];

    const monsterData = enemyList[randomKey];

    const enemy = createEnemy(monsterData, floor);

    enemies.push(enemy.toRuntime());
  }

  return {
    type: "monster",
    enemies,
    cleared: false
  };
}


