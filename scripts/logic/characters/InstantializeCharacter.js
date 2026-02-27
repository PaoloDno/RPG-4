import { HeroList } from "../../game_content/Entity/heroesList.js";
import { getstate } from "../../game_content/SaveManager/savemange.js";
import { showNotification } from "../../ui/notifications/notificationModal.js";
import { Character } from "./Character.js";

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

export function aggregateEquipmentStats(equipment = {}, element) {
  const total = { ...EMPTY_STATS };

  // safety: must be object-like
  if (!equipment || typeof equipment !== "object") return total;

  for (const slot in equipment) {
    const item = equipment[slot];
    if (!item || typeof item !== "object") continue;

    const stats = item.stats;
    if (!stats || typeof stats !== "object") continue;

    const isElementMatch = item.element && item.element === characterElement;
    const multiplier = isElementMatch ? 1.1 : 1;


    for (const stat in stats) {
      if (!(stat in total)) continue;

      const value = Number(stats[stat]);

      // prevent NaN pollution
      if (!Number.isFinite(value)) continue;

      total[stat] +=  Math.ceil(value * multiplier);
    }
  }

  return total;
}

  // HERO SKILLS BY LEVEL
export function getSkillsByLevel(skills, level) {
  if (!skills || typeof skills !== "object") return [];

  const lvl = Number(level);
  if (!Number.isFinite(lvl)) return [];

  return Object.entries(skills)
    .map(([reqLevel, skill]) => [Number(reqLevel), skill])
    .filter(([reqLevel, skill]) => Number.isFinite(reqLevel) && lvl >= reqLevel && skill)
    .sort((a, b) => a[0] - b[0]) // 👈 ensure correct order
    .map(([_, skill]) => skill);
}

  // EQUIPMENT to SKILLS
export function getEquipmentSkills(equipment) {
  if (!equipment || typeof equipment !== "object") return [];

  return Object.values(equipment)
    .filter(item => item && typeof item === "object" && item.skill)
    .map(item => item.skill);
}

export default async function initializeCharacter (selectedHeroes) {

    
  await showNotification({text: "May the gods be in your partys favor!"}).promise;

    return selectedHeroes
      .map(name => {
      const heroTemplate = HeroList[name];
      if (!heroTemplate) {
        console.warn(`Hero ${name} not found in HeroList`);
        return null;
      }
      

      const charInstance = new Character(
        heroTemplate.name,
        heroTemplate.element,
        1,
        heroTemplate.type,
        heroTemplate.baseStats,
        heroTemplate.growthStats,
        heroTemplate.rarity
      );

      const { name: runtimeName, element, level, type, rarity, stats, skills, attributes } = charInstance.toRuntime();

      return {
        name: runtimeName,
        element,
        level,
        type,
        rarity,
        stats,
        skills,
        attributes,
        class: heroTemplate.type,
        level: level,
        attributes,
        stats,
        equipmentStats: {
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
        equipments: {
          weapon: null,
          head: null,
          chest: null,
          pants: null,
          gloves: null,
          boots: null,
          accessories: null,
        },
        exp: 0,
        chibisprite: heroTemplate.chibisprite
      };

      
  }
    

)
    .filter(Boolean);
}

{/*
export function instantalizeParty () {
  let state = getstate();
  console.log(state);
  let { party } = state;

  return party
    .map((char) => {
      const heroTemplate = HeroList[char.name];

      const { equipment, level, statusEffect } = char;

      if (!heroTemplate) {
        console.warn(`Hero ${char.name} not found in HeroList`);
        return null;
      }

      const equipmentStats = aggregateEquipmentStats(heroTemplate)

      const baseSkills = getHeroSkillsByLevel(heroTemplate, level = 1);
      const equipSkills = getEquipmentSkills(equipment);
      // what if equipskills empty
      const allSkills = [...new Set([...baseSkills, ...equipSkills])];

      const charInstance = new Character(
        heroTemplate.name,
        heroTemplate.element,
        level,
        heroTemplate.type,
        heroTemplate.baseStats,
        heroTemplate.growthStats,
        heroTemplate.rarity,
        (equipment = {
          weapon: equipment.weapon || "",
          head: equipment.head || "",
          chest: equipment.chest || "",
          arms: equipment.arms || "",
          accessories: equipment.accessories || "",
        }),
        equipmentStats,
        (skills = [...allSkills]),
        statusEffect,
      );

      const {
        hp,
        mp,
        sp,
        physAtk,
        mgkAtk,
        actionSpeed,
        critR,
        critD,
        armor,
        mgkRes,
        stats,
      } = charInstance.toRuntime();

      return {
        name: heroTemplate.name,
        class: heroTemplate.type,
        level: level,
        attributes: {
          hp,
          maxHp: hp,
          mp,
          maxMp: mp,
          sp,
          physAtk,
          mgkAtk,
          maxSp: sp,
          actionSpeed,
          critR,
          critD,
          armor,
          mgkRes,
        },
        stats,
        equipmentStats: {
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
        skills: [
          // chracter skills base on level
          // push equipment skills
        ],
        equipment: {
          weapon: null,
          head: null,
          chest: null,
          pants: null,
          gloves: null,
          boots: null,
          accessories: null,
        },
        exp: 0,
        chibisprite: heroTemplate.chibisprite,
      };
    })
    .filter(Boolean);
}

export function validateEquipmentList(list) {
  for (const item of list) {
    if ("skill" in item && typeof item.skill !== "string") {
      console.warn(
        `Invalid skill format on ${item.key}. Must be a string or removed.`
      );
    }
  }
}
  */}