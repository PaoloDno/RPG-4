function getMaxLevelByRarity(rarity) {
  if (rarity === 3) return 10;
  if (rarity === 4) return 20;
  if (rarity === 5) return 30;
  return 1;
};

import { generateId } from "../utils/generateId.js";
import EquipmentList from "./equipmentList.js";

export function generateEquipment(equipmentId, level) {
  const template = EquipmentList[equipmentId];
  if (!template) return null;

  if(!level){
  let maxLevel = getMaxLevelByRarity(template.rarity);
  level = Math.ceil(Math.random() * maxLevel);
  }

  const equipmentload = loadEquipment(equipmentId, level);

  

  return {
    ...equipmentload,
  };
};

export function loadEquipment(equipmentId, level) {
  const template = EquipmentList[equipmentId];

  return {
    uId: generateId(),
    templateId: equipmentId,
    equipped: false,
    name: template.name,
    slot: template.slot,
    rarity: template.rarity,
    element: template.element,
    skill: template.skill,
    level,
    stats: calculateStats(template, level),
  };
};

function calculateStats(template, level = 1) {
  const stats = {};

  for (const stat in template.baseStats) {
    const base = template.baseStats[stat];
    const growth = template.growthStats[stat] || 0;

    stats[stat] = Math.floor(base + growth * (level - 1));
  }

  return stats;
};
