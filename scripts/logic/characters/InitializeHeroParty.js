import { getstate, setstate } from "../../core/SaveManager/savemange.js";
import { showNotification } from "../../ui/notifications/notificationModal.js";
import { stateAddEquipment } from "../utils/addItems.js";
import { equipItem, getAllEquipped } from "../utils/equipItem.js";
import { CharacterList } from "./characterList.js";
import {
  InitializeGenerateHeroSkill,
  InitializeHeroAttributes,
  InitializeHeroBaseAttributes,
  InitializeHeroEquipmentAttribute,
  InitializeHeroSkill,
} from "./InitializeHero.js";

export async function InitializeheroPartyBaseAttributes(selectedHero) {
  await showNotification({ text: "A Party is Formed" }).promise;

  return selectedHero.map((name) => {
    const heroTemplate = CharacterList[name];

    if (!heroTemplate) {
      console.warn(`Hero ${name} not found in HeroList`);
      return null;
    }

    const { element, level, type, baseStats } =
      InitializeHeroBaseAttributes(
        heroTemplate.name,
        heroTemplate.element,
        5,
        heroTemplate.type,
        heroTemplate.baseStats,
        heroTemplate.growthStats,
      );
    
    return {
      name: name,
      element: element,
      level: level,
      type: type,
      baseStats: baseStats,
      equipment: {
        weapon: "",
        head: "",
        chest: "",
        arms: "",
        boots: "",
        accessories: "",
      },
      exp: 0,
      chibisprite: heroTemplate.chibisprite,
      combatsprite: heroTemplate.combatsprite,
      splashsprite: heroTemplate.splashsprite,
    }

  });
}

export async function InitializeHeroPartyEquipsAttributes(initializeParty) {

  initializeParty.map((hero, index) => {
    const state = getstate();  
    const heroTemplate = CharacterList[hero.name];
    let beginnerWeapon = stateAddEquipment(heroTemplate.equipment.weapon, 3);
    let beginnerArmor = stateAddEquipment("AdventurerVest", 3);

    console.log("w", beginnerWeapon);
    console.log("A", beginnerArmor);
    console.log(index);
    console.log("hero", state.party[index]);
    equipItem(index, beginnerWeapon.uId);
    equipItem(index, beginnerArmor.uId);
  });

  const state = getstate();
  const {party} = state;

  console.log("StateEquips", state);
  party.map((hero) => {
    let equipment = getAllEquipped(state, hero,)
    console.log("equipment", equipment);
    hero.equipment = equipment;
  })
  console.log("end-of-chang-state", party);

  InitializeHeroPartyStatsAndSkillAttributes();

  return party;
}

export async function InitializeHeroPartyStatsAndSkillAttributes() {
  // you know what ill take it firm the state which i shiuld have dont form the start
  // the fitrst and second requires the input from outside now it just need mine
  // i learned the need for some dynamic memory state than can be erase when not needed
  // the combat is one of them but i underestimate the number of possible dynamic state that are read rarely

  const state = getstate();
  const { party } = state;

 const newParty = party.map((hero) => {
    const { element, baseStats, level } = hero;

    console.log(hero);

   const equipment = getAllEquipped(state, hero);

    const equipmentStats = InitializeHeroEquipmentAttribute(element, equipment);

    let mergeStats = {
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
      ...baseStats,
    };

    Object.keys(equipmentStats).forEach((stat) => {
      mergeStats[stat] += equipmentStats[stat];
    });

    let heroTemplate = CharacterList[hero.name];

    const mergeSkill = InitializeHeroSkill(
      equipment,
      level,
      heroTemplate.skills,
    );

    let skills = InitializeGenerateHeroSkill(mergeSkill, mergeStats);

    console.log("baseStats", baseStats);
    console.log("equipStats", equipmentStats);
    console.log("mergeStats", mergeStats);

    let attributes = InitializeHeroAttributes(
      baseStats,
      equipmentStats
    );


    return {
      ...hero,
      attributes,
      equipmentStats,
      skills,
      mergeSkill,
    };
  });
  
  setstate({
    ...state,
    party: newParty,
  });
}