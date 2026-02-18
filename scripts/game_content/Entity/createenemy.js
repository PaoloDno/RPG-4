import { Character } from "../../logic/characters/Character.js";
import { getstate } from "../SaveManager/savemange.js";

export function createEnemy(monsterData, floor = 1) {

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
