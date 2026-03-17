import { generateSkill } from "../skills/generateSkill.js";

export function Character(
  name,
  element = "base",
  level = 20,
  type = "Adventurer",
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
  skills = {},
  status = {
    hp: null, 
    mp: null, 
    sp: null
  },
  equipementStats = {
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
  block = 1,
) {
  const stats = {
    str: 5,
    mgk: 5,
    sta: 5,
    mna: 5,
    def: 5,
    res: 5,
    hlt: 5,
    spd: 5,
    agi: 5,
    dex: 5,
    ...baseStats,
  };

  Object.keys(stats).forEach((stat) => {
    const growth = growthStats[stat] || 1.1;
    stats[stat] += Math.floor(growth * (level - 1));
  });
  console.log("BASE", stats);
  baseStats = {...stats};

  const equipmentTotals = aggregateEquipmentStats(equipment, element);

  Object.keys(equipementStats).forEach((stat) => {
    equipementStats[stat] += equipmentTotals[stat] || 0;
    stats[stat] += equipmentTotals[stat] || 0;
  });

  console.log("Stats", stats);
  console.log("EStats", equipementStats);
  let maxHp, maxMp, maxSp;
  let actionSpeed;
  let critR, critD, eva, blockRate;
  let armor, mgkRes;

  function calcResources() {
    maxHp = Math.floor(stats.hlt * 5 + stats.def + stats.res);

    maxMp = Math.floor(stats.mna * 4 + (stats.mgk + stats.dex) / 2 + stats.sta);

    maxSp = Math.floor(stats.sta * 4 + (stats.str + stats.dex) / 2 + stats.mna);
  }

  
  function calcActionSpeed() {
    actionSpeed = Math.floor(
      stats.spd * 3 + stats.agi * 2 + stats.dex + stats.sta,
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
    calcActionSpeed();
    calcCrit();
    calcDefense();
    calcAvoidance();
  }

  this.toRuntime = function () {
    buildDerived();

    let { hp, mp, sp } = status || {};

    hp = hp ?? maxHp;
    mp = mp ?? maxMp;
    sp = sp ?? maxSp;

    const attributes = {
      ...stats,
      hp: hp,
      maxHp: maxHp,
      mp,
      maxMp: maxMp,
      sp,
      maxSp: maxSp,
      actionSpeed,
      armor,
      mgkRes,
      critR,
      critD,
      eva,
      blockRate,
    };

    const classSkills = getSkillsByLevel(skills, level);
    console.log("classSkill", classSkills);
    const levelSkills = Array.isArray(classSkills) ? classSkills : [];
    console.log("levelSkill", levelSkills);
    const equipmentSkills = getEquipmentSkills(equipment);

    const mergedSkills = [...new Set([...levelSkills, ...equipmentSkills])];
    console.log(mergedSkills);

    const runtimeSkills = mergedSkills.map((skill) => {
      let dummyAria = {
        actionSpeed: 132,

        hp: 138,
        maxHp: 138,

        mp: 159,
        maxMp: 159,

        sp: 101,
        maxSp: 101,

        str: 14,
        dex: 14,
        agi: 22,
        sta: 14,

        mgk: 28,
        mna: 31,

        def: 14,
        res: 19,
        mgkRes: 30,
        armor: 22,

        hlt: 21,
        spd: 20,

        critR: 15,
        critD: 114,

        eva: 6,
        blockRate: 7,
      };

      let skillgen = generateSkill(skill, attributes);
      let compDamage = skillgen.preview();
      console.log("skillGENds", skillgen.description());

      console.log("skillGENpreview", skillgen.preview());

      console.log("skillGENpc", skillgen.payCost(compDamage));

      console.log("useDaamage: ", skillgen.use(dummyAria));
      return skillgen;
    });

    return {
      name,
      baseStats,
      element,
      level,
      type,
      rarity,

      skills: runtimeSkills,

      equipment,
      equipementStats,
      attributes,
      block,
    };
  };
}

const EMPTY_STATS = {
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
};

export function aggregateEquipmentStats(equipment = {}, CharElement) {
  const total = { ...EMPTY_STATS };

  // safety: must be object-like
  if (!equipment || typeof equipment !== "object") return total;

  for (const slot in equipment) {
    const item = equipment[slot];
    if (!item || typeof item !== "object") continue;

    const stats = item.stats;
    if (!stats || typeof stats !== "object") continue;

    const isElementMatch = item.element && item.element === CharElement;
    const multiplier = isElementMatch ? 1.1 : 1;

    for (const stat in stats) {
      if (!(stat in total)) continue;

      const value = Number(stats[stat]);

      // prevent NaN pollution
      if (!Number.isFinite(value)) continue;

      total[stat] += Math.ceil(value * multiplier);
    }
  }

  console.log("EquipmentStat: ", total);

  return total;
}

// HERO SKILLS BY LEVEL
export function getSkillsByLevel(skills, level) {
  if (!skills || typeof skills !== "object") return [];

  const lvl = Number(level);
  if (!Number.isFinite(lvl)) return [];

  return Object.entries(skills)
    .map(([reqLevel, skill]) => [Number(reqLevel), skill])
    .filter(
      ([reqLevel, skill]) =>
        Number.isFinite(reqLevel) && lvl >= reqLevel && skill,
    )
    .sort((a, b) => a[0] - b[0]) // 👈 ensure correct order
    .map(([_, skill]) => skill);
}

// EQUIPMENT to SKILLS
export function getEquipmentSkills(equipment) {
  if (!equipment || typeof equipment !== "object") return [];

  return Object.values(equipment)
    .filter((item) => item && typeof item === "object" && item.skill)
    .map((item) => item.skill);
}

//**
// const ELEMENT_ADVANTAGE = {
//  aqua: {pyro: 1.3, light: 1.1, dark: 0.9, wind:0.7, base: 1},
//  pyro: {wind: 1.3, light: 1, dark: 1, aqua:0.7, base: 1},
//  wind: {aqua: 1.3, light: 1, dark: 0.9, pyro:0.7, base: 1.1},

//  light: {dark: 1.3, aqua: 1.1, wind: 1.1, pyro: 1.1, base: 0.8},
//  dark:  {light: 1.3,aqua: 1, wind: 1, pyro: 1, base: 1},

//  base: {dark: 1.2 , light: 1, pyro: 1, wind: 1, aqua: 1} }; **/
