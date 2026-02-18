import { enemyList } from "../../../../game_content/Entity/enemyList.js";
import { getstate, setstate } from "../../../../game_content/SaveManager/savemange.js";
import { Character } from "../../../../logic/characters/Character.js";
import { generateId } from "../../../../logic/utils/generateId.js";
import { distanceHelper } from "../map/maps.js";

function createEnemy(monsterData, floor = 1) {

  const state = getstate();
  const { world } = state;
  const { week } = world;


  const level = floor + Math.floor(Math.random() * 3) + Math.floor(1 * week );

  const {
    name,
    type,
    rarity = 1,
    baseStats = {},
    growthStats = {},
    element = ["base"],
    block = 1,
    skills = ["slash"]
  } = monsterData;

  const finalElement =
    element[Math.floor(Math.random() * element.length)];

  const enemy = new Character(
    name,
    finalElement,
    level,
    type,
    baseStats,
    growthStats,
    rarity,
    block
  );

  enemy.skills = [...skills]; 

  return enemy;
}



export function createMonsterGroup(floor = 1) {
  const groupSize = Math.floor(Math.random() * 3) + 1;

  const enemyKeys = Object.keys(enemyList);

  const available = enemyKeys.filter((key) => {
    const e = enemyList[key];
    return !e.floor || floor >= e.floor;
  });

  if (available.length === 0) {
    console.warn("No enemies available for floor:", floor);
    return {
      id: generateId(),
      type: "monster",
      enemies: [],
      loot: [],
      cleared: true,
    };
  }

  const enemies = [];
  const loot = [];

  for (let i = 0; i < groupSize; ) {
    const randomKey =
      available[Math.floor(Math.random() * available.length)];

    const monsterData = enemyList[randomKey];

    const enemy = createEnemy(monsterData, floor);
    const runtime = enemy.toRuntime();

    loot.push(generateLootFromDrop(monsterData.drop));

    i += runtime.block;
    enemies.push(runtime);
  }

  return {
    id: generateId(), // REQUIRED
    type: "monster",
    enemies,
    loot,
    cleared: false,
  };
}


export function generateLootFromDrop(dropArray = []) {
  const loot = [];

  // 60% chance to drop
  if (Math.random() > 0.6) {
    return loot;
  }

  if (!dropArray.length) return loot;

  const randomIndex = Math.floor(Math.random() * dropArray.length);
  const reward = dropArray[randomIndex];

  if (typeof reward === "number") {
    loot.push({
      type: "gold",
      qty: reward,
    });
  } else {
    loot.push({
      ...reward,
      qty: 1,
    });
  }

  return loot;
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
