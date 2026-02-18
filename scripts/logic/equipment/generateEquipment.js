function getMaxLevelByRarity(rarity) {
  if (rarity === 3) return 10;
  if (rarity === 4) return 20;
  if (rarity === 5) return 30;
  return 1;
}

import { generateId } from "../utils/generateId.js";
import EquipmentList from "./equipmentList.js";

export function generateEquipment(equipmentId) {
  const template = EquipmentList[equipmentId];
  if (!template) return null;

  return {
    templateId: generateId(),
    name: template.name,
    slot: template.slot,
    rarity: template.rarity,
    element: template.element,
    level: 1,
    maxLevel: getMaxLevelByRarity(template.rarity),
    exp: 0,
    stats: calculateStats(template, 1)
  };
}


function calculateStats(template, level = 1) {
  const stats = {};

  for (const stat in template.baseStats) {
    const base = template.baseStats[stat];
    const growth = template.growthStats[stat] || 0;

    stats[stat] = Math.floor(base + growth * (level - 1));
  }

  return stats;
}
