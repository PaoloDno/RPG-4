import { HeroList } from "../../game_content/Entity/heroesList.js";
import { getstate } from "../../core/SaveManager/savemange.js";
import { showNotification } from "../../ui/notifications/notificationModal.js";
import { Character } from "./Character.js";
import { CharacterList } from "./characterList.js";
import { generateEquipment } from "../equipment/generateEquipment.js";
import { stateAddEquipment } from "../utils/addItems.js";


export default async function initializeCharacter (selectedHeroes) {

    
  await showNotification({text: "May the gods be in your partys favor!"}).promise;

    return selectedHeroes
      .map(name => {
      const heroTemplate = CharacterList[name];
      
      if (!heroTemplate) {
        console.warn(`Hero ${name} not found in HeroList`);
        return null;
      }
      
      let beginnerWeapon = stateAddEquipment( heroTemplate.equipment.weapon, 1 );
      let beginnerArmor = stateAddEquipment( "AdventurerVest", 3 );

      console.log(beginnerArmor);
      console.log(beginnerWeapon);

      const charInstance = new Character(
        heroTemplate.name,
        heroTemplate.element,
        10,
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

      const { name: runtimeName, baseStats, element, level, type, rarity, status, skills, attributes, equipementStats, equipment} = charInstance.toRuntime();

      return {
        name: runtimeName,
        element,
        level,
        type,
        rarity,
        baseStats,
        skills,
        attributes,
        class: heroTemplate.type,
        level: level,
        status: {
          ...status,
          exp: 0,
          toLvlUp: 50,
          totalExp: 0,
        },
        equipment,
        equipementStats,
        exp: 0,
        chibisprite: heroTemplate.chibisprite
      };

      
  }
    

)
    .filter(Boolean);
}