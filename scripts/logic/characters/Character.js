import {
  aggregateEquipmentStats,
  getEquipmentSkills,
  getSkillsByLevel,
} from "./InstantializeCharacter.js";

export function Character(
  name,
  element = "base",
  level = 1,
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
  skills = {},
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

  Object.keys(stats).forEach((stat) => {
    stats[stat] += equipementStats[stat] || 0;
  });

  let hp, mp, sp;
  let physAtk, mgkAtk, actionSpeed;
  let critR, critD, eva, blockRate;
  let armor, mgkRes;

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

    const classSkills = getSkillsByLevel(skills, level);
    
    const levelSkills = Array.isArray(classSkills) ? classSkills : [];

    const equipmentSkills = getEquipmentSkills(equipment);

    const mergedSkills = [...new Set([...levelSkills, ...equipmentSkills])];
    console.log(classSkills,)

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

//**
// const ELEMENT_ADVANTAGE = {
//  aqua: {pyro: 1.3, light: 1.1, dark: 0.9, wind:0.7, base: 1},
//  pyro: {wind: 1.3, light: 1, dark: 1, aqua:0.7, base: 1},
//  wind: {aqua: 1.3, light: 1, dark: 0.9, pyro:0.7, base: 1.1},

//  light: {dark: 1.3, aqua: 1.1, wind: 1.1, pyro: 1.1, base: 0.8},
//  dark:  {light: 1.3,aqua: 1, wind: 1, pyro: 1, base: 1},

//  base: {dark: 1.2 , light: 1, pyro: 1, wind: 1, aqua: 1} }; **/
