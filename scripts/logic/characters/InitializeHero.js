import { generateSkill } from "../skills/generateSkill.js";


export function InitializeHeroBaseAttributes (
  name,
  element = 'base',
  level = 5,
  type = "Adventurer",
  baseStats = {},
  growthStats = {},

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
    stats[stat] += Math.floor( 2 * (growth * (level - 1)));
  });

  console.log("Base", stats);
  baseStats = { ...stats};

  return {
    name,
    element,
    level,
    type,
    baseStats,
  };  
}

export function InitializeHeroEquipmentAttribute (
  element,
  equipment = {
    weapon: "",
    head: "",
    chest: "",
    arms: "",
    boots: "",
    accessories: "",
  },
  
) {

  const equipmentStats = {
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
  }
  
  const equipmentTotals = aggregateEquipmentStats(equipment, element);

  Object.keys(equipmentStats).forEach((stat) => {
    equipmentStats[stat] += equipmentTotals[stat] || 0;
  });

  return equipmentStats;
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

function aggregateEquipmentStats(equipment = {}, charElement) {
  
  const total = { ...EMPTY_STATS };

  // safety
  if ( !equipment || typeof equipment !== "object") return total; // safety

  for (const slot in equipment) {
    const item = equipment[slot];
    if (!item || typeof item !== "object") continue;

    const stats = item.stats;
    if (!stats || typeof stats !== "object") continue;

    //element match
    const isElementMatch = item.element && item.element === charElement;
    const multiplier = isElementMatch ? 1.2 : 1;

    for (const stat in stats) {
      if (!(stat in total)) continue;

      const value = Number(stats[stat]);

      // prevent NaN pollution
      if (!Number.isFinite(value)) continue;

      total[stat] += Math.ceil(value * multiplier);
    }
  }

  return total;
}

export function InitializeHeroSkill(
  equipment,
  level,
  skills = {},
){

  const classSkills = getSkillsByLevel(skills, level);

  const levelSkills = Array.isArray(classSkills) ? classSkills : [];

  const equipmentSkills = getEquipmentSkills(equipment);
  const mergeSkills = [ ...new Set([...levelSkills, ...equipmentSkills])]

  return mergeSkills;
} 

export function getSkillsByLevel(skills, level) {
  if (!skills || typeof skills !== "object") return [];

  const lvl = Number(level); // it even looksl ike game dev yaerns for static language
  if(!Number.isFinite(lvl)) return [];

  return Object.entries(skills)
    .map(([reqLevel, skill]) => [Number(reqLevel), skill])
    .filter(
      ([reqLevel, skill]) =>
        Number.isFinite(reqLevel) && lvl >= reqLevel && skill,
    )
    .sort((a, b) => a[0] - b[0])
    .map(([_, skill]) => skill)
}

export function getEquipmentSkills(equipment) {
  if (!equipment || typeof equipment !== "object") return [];

  return Object.values(equipment)
    .filter((item) => item && typeof item === "object" && item.skill)
    .map((item) => item.skill);
}


export function InitializeGenerateHeroSkill(
  skills,
  attributes,
 ) {
  return Object.values(skills)
    .map((skill) => generateSkill(skill, attributes));
 }

export function InitializeHeroAttributes (
  baseAttributes,
  equipmentAttributes,
){
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
    ...baseAttributes,
  };

  Object.keys(equipmentAttributes).forEach((stat) => {
    stats[stat] += equipmentAttributes[stat] || 0;
  });

  let maxHp, maxSp, maxMp;
  let actionSpeed;
  let critR, critD, evasion, blockRate, shield;
  let armor, mgkRes;

  function calcResources() {
    maxHp = Math.floor((stats.hlt * 4) + stats.def + stats.res);

    maxSp = Math.floor((stats.sta * 3) + stats.str + stats.def);
    
    maxMp = Math.floor((stats.mna * 3) + stats.mgk + stats.res);
  }

  function calcActionSpeed() {
    actionSpeed = Math.floor( (stats.spd * 5) + (stats.agi * 2) + (stats.dex * 2) + stats.sta);
  }

  function calcCrit () {
    const rawCR = Math.floor( 10 + (((stats.agi * 3) + (stats.dex * 5)) / 10) );
    const overflowRawCr = Math.max( 0, rawCR - 90);
    critR = Math.floor( 10 + Math.min(90, rawCR));
    critD = Math.floor( 110 + overflowRawCr + (rawCR * 1.4));
  }

  function calcDefense () {
    mgkRes = 5 + Math.floor((stats.res * 2 + stats.mna) / 5);
    armor = 5 + Math.floor((stats.def * 2 + stats.agi) / 5);
  }

  function calcRatio () {
    blockRate = Math.min( 65,
      5 + Math.floor(stats.agi));
    shield = 10 + Math.floor( ((stats.def * 2) + (stats.ref * 2) + stats.dex ) / 2 );
    evasion = Math.min( 55,
      5 + Math.floor((stats.agi + stats.dex)/ 5));
  }

  function BuildHeroAttributes (){
    calcResources();
    calcActionSpeed();
    calcCrit();
    calcDefense();
    calcRatio();
  }

  BuildHeroAttributes();

  return {
    hp: maxHp,
    mp: maxMp,
    sp: maxSp,
    maxHp,
    maxMp,
    maxSp,

    actionSpeed,
    
    critR,
    critD,

    mgkRes,
    armor,

    blockRate,
    shield,
    evasion,

    attributesStats: stats,
  }
}