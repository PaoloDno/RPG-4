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
    skills,
    chibisprite,
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
    {},
    {},
    skills,
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

export function Monster(
  name,
  element,
  level = 1,
  type = "Monster",
  baseStats = {},
  growthStats = {},
  rarity = 3,
  equipment = {
    weapon: "",
    head: "",
    chest: "",
    arms: "",
    boots: "",
    accessories: "",
  },
  equipmentStats = {
    str: 0,
    mgk: 0,
    sta: 0,
    mna: 0,
    def: 0,
    res: 0,
    hlt: 0,
    spd: 0,
    agi: 0,
    dex: 0,
  },
  skills = [],
  block = 1,
) {
  const stats = {
    str: 20,
    mgk: 20,
    sta: 20,
    mna: 20,
    def: 20,
    res: 20,
    hlt: 20,
    spd: 20,
    agi: 20,
    dex: 20,
    ...baseStats,
  };

  Object.keys(stats).forEach((stat) => {
    const growth = growthStats[stat] || 1;
    stats[stat] += Math.floor(growth * (level - 1));
  });

  
    function calcResources() {
      hp = stats.hlt * 8 + Math.floor(((stats.def + stats.res) / 4) * 5);
  
      mp =
        stats.mna * 5 +
        Math.floor((stats.mgk + stats.dex) / 2) +
        Math.floor(stats.sta / 2);
  
      sp =
        stats.sta * 5 +
        Math.floor((stats.str + stats.agi) / 2) +
        Math.floor(stats.mna / 2);
    }
  
    function calcAttack() {
      physAtk = stats.str * 4 + Math.floor(stats.dex / 5 + stats.sta / 5);
      mgkAtk = stats.mgk * 4 + Math.floor(stats.res / 5 + stats.mna / 5);
    }
  
    function calcActionSpeed() {
      actionSpeed = Math.floor(
        (stats.spd * 2 + stats.agi + Math.floor((stats.dex + stats.sta) / 2)) /
          10,
      );
    }
  
    function calcCrit() {
      const rawCR = 10 + Math.floor(stats.agi / 5) + Math.floor(stats.dex / 10);
      const overflow = Math.max(0, rawCR - 90);
      const dmgStat = Math.max(stats.str, stats.mgk);
  
      critR = Math.min(90, rawCR);
      critD =
        110 +
        Math.floor(overflow / 10) +
        Math.floor(stats.dex / 5) +
        Math.floor(dmgStat / 10);
    }
  
    function calcDefense() {
      mgkRes =
        5 +
        Math.floor(stats.res / 2 + stats.mgk / 5 + stats.hlt / 5 + stats.mna / 5);
      armor =
        5 +
        Math.floor(stats.def / 2 + stats.str / 5 + stats.agi / 5 + stats.dex / 5);
    }
  
    function calcAvoidance() {
      blockRate = Math.min(
        75,
        5 + Math.floor(stats.def / 10) + Math.floor(stats.dex / 10),
      );
      eva = Math.min(
        45,
        2 + Math.floor(stats.agi / 10) + Math.floor(stats.spd / 10),
      );
    }
  
    function buildDerived() {
      calcResources();
      calcAttack();
      calcActionSpeed();
      calcCrit();
      calcDefense();
      calcAvoidance();
    }
  
    this.toRuntime = function () {
      buildDerived();
  
      const skills = getHeroSkillsByLevel(type, level);
      
      const levelSkills = Array.isArray(skills) ? skills : [];
  
      const equipmentSkills = getEquipmentSkills(equipment);
  
      const mergedSkills = [...new Set([...levelSkills, ...equipmentSkills])];
  
      return {
        name,
        element,
        level,
        type,
        rarity,
  
        block,
  
        stats: { ...stats },
  
        skills: [...mergedSkills],
  
        attributes: {
          hp,
          maxHp: hp,
          mp,
          maxMp: mp,
          sp,
          maxSp: sp,
  
          physAtk,
          mgkAtk,
  
          actionSpeed,
  
          armor,
          mgkRes,
  
          critR,
          critD,
  
          eva,
          blockRate,
      },
    };
  };
}