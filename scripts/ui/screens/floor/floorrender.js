import { createEnemy } from "../../../game_content/Entity/createenemy.js";
import { enemyList } from "../../../game_content/Entity/enemyList.js";
import {
  getstate,
  setstate,
} from "../../../game_content/SaveManager/savemange.js";
import { chestLootTable } from "./map/chest.js";
import {
  BASE_TILE_DEF,
  distanceHelper,
  floormaps,
} from "./map/maps.js";
import { generateId } from "../../../logic/utils/generateId.js";

const VISIBLE_RADIUS = 2;
const SHADOW_RADIUS = 3;

export function renderMapTiles() {
  const grid = [];
  const state = getstate();
  const { x: px, y: py, floor } = state.position;

  // =========================
  // Initialize memoryMap floor
  // =========================
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
            blocking: true,
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
            entity: null,
            blocking: false,
            discovered: false,
          };
        }

        //add meta ["u", {x: 0, y: 0}] coord next floor down
        if (symbol === "d") {
          return {
            base: "stairDown",
            entity: null,
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

  // =========================
  // Visibility Update (Immutable Batch)
  // =========================

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

  // =========================
  // Build Render Grid
  // =========================

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

    console.log(currentMap, updatedFloor, grid);
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


export function renderTile(tileData) {
  const state = getstate();
  const { position } = state;
  const { x: px, y: py } = position;

  const div = document.createElement("div");
  div.className = "tile";

  // Outside map
  if (!tileData.tile) {
    div.classList.add("void"); // instead of null
    return div;
  }

  const { x, y, tile, clarity } = tileData;

  if (x === px && y === py) {
    div.classList.add("player");
    return div;
  }

  // Clarity states
  if (clarity === "hidden") {
    div.classList.add("hidden");
  } else if (clarity === "shadow") {
    div.classList.add("shadow");
  }

  // Base tile
  div.classList.add(tile.base);

  // Entity layer
  if (tile.entity && !tile.entity.cleared) {
    div.dataset.entityType = tile.entity.type;

    // Add a child div representing the entity
    const entityDiv = document.createElement("div");
    entityDiv.className = "entity-circle";

    // Optional: different colors per entity type
    if (tile.entity.type === "monster") {
      entityDiv.style.backgroundColor = "red";
    } else if (tile.entity.type === "chest") {
      entityDiv.style.backgroundColor = "gold";
    }

    // Size and shape
    entityDiv.style.width = "80%";
    entityDiv.style.height = "80%";
    entityDiv.style.borderRadius = "50%"; // circle
    entityDiv.style.position = "absolute";
    entityDiv.style.top = "50%";
    entityDiv.style.left = "50%";
    entityDiv.style.transform = "translate(-50%, -50%)"; // center inside tile
    entityDiv.style.pointerEvents = "none"; // don't block clicks

    div.appendChild(entityDiv);

    // Also optional: add class for future CSS animations
    div.classList.add(tile.entity.type);
  }

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

  const available = enemyKeys.filter((key) => {
    const e = enemyList[key];
    return !e.floor || floor >= e.floor;
  });

  if (available.length === 0) {
    console.warn("No enemies available for floor:", floor);
    return {
      id: crypto.randomUUID(),
      type: "monster",
      enemies: [],
      loot: [],
      cleared: true,
    };
  }

  const enemies = [];

  for (let i = 0; i < groupSize; ) {
    const randomKey =
      available[Math.floor(Math.random() * available.length)];

    const monsterData = enemyList[randomKey];

    const enemy = createEnemy(monsterData, floor);
    const runtime = enemy.toRuntime();

    i += runtime.block;
    enemies.push(runtime);
  }

  return {
    id: generateId(), // REQUIRED
    type: "monster",
    enemies,
    loot: [],
    cleared: false,
  };
}


function rollChestRarity() {
  const roll = Math.floor(Math.random() * 100) + 1;

  if (roll <= 50) return 2;
  if (roll <= 80) return 3;
  if (roll <= 95) return 4;
  return 5;
}

function createChest(floor) {
  const rarity = rollChestRarity();
  const table = chestLootTable[rarity];

  return {
    type: "chest",
    rarity,
    floor,
    opened: false,
    cleared: false,
  };
}


export function runMonsterTurn() {
  const state = getstate();
  const { x: px, y: py, floor } = state.position;

  const currentMap = state.memoryMap[floor];
  if (!currentMap) return;

  let changed = false;

  // Clone floor immutably
  const newFloor = currentMap.map(row =>
    row.map(tile => ({ ...tile }))
  );

  const moved = new Set(); // prevent double movement

  for (let y = 0; y < newFloor.length; y++) {
    for (let x = 0; x < newFloor[y].length; x++) {

      const tile = newFloor[y][x];

      if (!tile.entity) continue;
      if (tile.entity.type !== "monster") continue;
      if (tile.entity.cleared) continue;
      if (moved.has(tile.entity.id)) continue;

      const dist = distanceHelper(x, y, px, py);
      if (dist > 2) continue;

      // -------- Axis priority movement (NO DIAGONAL) --------
      let dx = 0;
      let dy = 0;

      const diffX = px - x;
      const diffY = py - y;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        dx = Math.sign(diffX);
      } else if (diffY !== 0) {
        dy = Math.sign(diffY);
      }

      const nx = x + dx;
      const ny = y + dy;

      // Don't step onto player
      if (nx === px && ny === py) continue;

      const target = newFloor[ny]?.[nx];
      if (!target) continue;
      if (target.base === "wall") continue;
      if (target.entity) continue;
      if (target.blocking) continue;

      // -------- Move Monster --------
      newFloor[ny][nx] = {
        ...newFloor[ny][nx],
        entity: tile.entity,
        blocking: true,
      };

      newFloor[y][x] = {
        ...newFloor[y][x],
        entity: null,
        blocking: false,
      };

      moved.add(tile.entity.id);
      changed = true;
    }
  }

  if (!changed) return;

  setstate({
    ...state,
    memoryMap: {
      ...state.memoryMap,
      [floor]: newFloor,
    },
  });
}



export function handleAdjacentInteractions() {
  const state = getstate();
  const { x: px, y: py, floor, facing } = state.position;
  const map = state.memoryMap[floor];
  if (!map) return null;

  // 4-directional adjacency (no diagonals)
  const directions = [
    { dx: 0, dy: -1, name: "top" },
    { dx: 1, dy: 0, name: "right" },
    { dx: 0, dy: 1, name: "bottom" },
    { dx: -1, dy: 0, name: "left" },
  ];

  // -------------------------
  // MONSTER CHECK (ALL SIDES)
  // -------------------------
  for (const dir of directions) {
    const tx = px + dir.dx;
    const ty = py + dir.dy;
    const tile = map?.[ty]?.[tx];

    if (!tile || !tile.entity || tile.entity.cleared) continue;

    if (tile.entity.type === "monster") {
      setstate({
        ...state,
        combat: {
          inBattle: true,
          enemyParty: tile.entity.enemies,
          originTile: { floor, x: tx, y: ty },
        },
      });

      return "combat";
    }
  }


  const facingDir = directions.find(d => d.name === facing);
  if (!facingDir) return null;

  const chestX = px + facingDir.dx;
  const chestY = py + facingDir.dy;
  const chestTile = map?.[chestY]?.[chestX];

  if (!chestTile || !chestTile.entity || chestTile.entity.cleared) {
    return null;
  }

  if (chestTile.entity.type === "chest") {

    const newFloor = map.map((row, y) =>
      row.map((t, x) => {
        if (x === chestX && y === chestY) {
          return {
            ...t,
            entity: { ...t.entity, cleared: true },
          };
        }
        return t;
      })
    );

    setstate({
      ...state,
      gold: state.gold + chestTile.entity.gold,
      memoryMap: {
        ...state.memoryMap,
        [floor]: newFloor,
      },
    });

    return "chest";
  }

  return null;
}
