import { chestLootTable } from "../map/chestLootTable.js";


export function createChest(floor, meta = {rating: 3}) {
  const rarity = meta.rating || rollChestRarity();
  let rating = rarity - 3;
  return {
    type: "chest",
    rarity,
    floor,
    loot: generateChestLoot(floor, rating),
    opened: false,
  };
}


function rollChestRarity() {
  const roll = Math.random();

  if (roll < 0.60) return 3;
  if (roll < 0.89) return 4;
  if (roll > 0.90) return 5;
}

function rollChance(chance = 100) {
  return Math.random() * 100 < chance;
}

export function generateChestLoot(floor, rarity) {
  const floorTable = chestLootTable[floor];
  if (!floorTable) return {};

  const rewards = floorTable[rarity];
  if (!rewards) return {};
  
  const loot = {
    gold: 0,
    items: [],
    ingredients: [],
    equipment: [],
  };

  for (const reward of rewards) {
    if (!rollChance(reward.chance)) continue;

    switch (reward.type) {
      case "gold":
        loot.gold += reward.qty;
        break;

      case "item":
        loot.items.push({
          key: reward.key,
          qty: reward.qty ?? 1,
        });
        break;

      case "ingredient":
        loot.ingredients.push({
          key: reward.key,
          qty: reward.qty ?? 1,
        });
        break;

      case "equipment":
        loot.equipment.push({
          key: reward.key,
          qty: reward.qty ?? 1,
        });
        break;
    }
  }

  return loot;
}