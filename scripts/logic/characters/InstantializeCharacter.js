import { HeroList } from "../../game_content/Entity/heroesList.js";
import { getstate } from "../../core/SaveManager/savemange.js";
import { showNotification } from "../../ui/notifications/notificationModal.js";
import { Character } from "./Character.js";
import { CharacterList } from "./characterList.js";
import { generateEquipment } from "../equipment/generateEquipment.js";


export default async function initializeCharacter (selectedHeroes) {

    
  await showNotification({text: "May the gods be in your partys favor!"}).promise;

    return selectedHeroes
      .map(name => {
      const heroTemplate = CharacterList[name];
      
      if (!heroTemplate) {
        console.warn(`Hero ${name} not found in HeroList`);
        return null;
      }
      
      let beginnerWeapon = generateEquipment( heroTemplate.equipment.weapon, 1 );
      let beginnerArmor = generateEquipment( "AdventurerVest", 1 );

      console.log(beginnerArmor);
      console.log(beginnerWeapon);

      const charInstance = new Character(
        heroTemplate.name,
        heroTemplate.element,
        1,
        heroTemplate.type,
        heroTemplate.baseStats,
        heroTemplate.growthStats,
        heroTemplate.rarity,
        {
          weapon: beginnerWeapon,
          head: "",
          chest: beginnerArmor,
          arms: "",
          boots: "",
          accessories: "",
        },
        heroTemplate.skills,
      );

      const { name: runtimeName, element, level, type, rarity, stats, skills, attributes, equipementStats, equipment} = charInstance.toRuntime();

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
        stats,
        equipment,
        equipementStats,
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