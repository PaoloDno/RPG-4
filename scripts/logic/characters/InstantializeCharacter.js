import { HeroList } from "../../game_content/Entity/heroesList.js";
import { Character } from "./Character.js";

export default function initializeCharacter (selectedHeroes, level = 1) {
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
        level,
        heroTemplate.type,
        heroTemplate.baseStats,
        heroTemplate.growthStats,
        heroTemplate.rarity
      );

       const { hp, mp, sp, actionSpeed, critR, critD, armor, mgkRes, stats } = charInstance.info();

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
          maxSp: sp,
          actionSpeed,
          critR,
          critD,
          armor,
          mgkRes
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
        skills: ["Slash", "Ki_Strike", "Mana_Blast"],
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
        chibisprite: heroTemplate.chibisprite
      };
    })
    .filter(Boolean);
}