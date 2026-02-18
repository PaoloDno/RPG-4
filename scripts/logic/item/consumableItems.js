export const itemList = [
  {
    id: 0,
    type: "consumables",
    key: "VeggieSoup",
    name: "VeggieSoup",
    description: "potion",
    slot: "item",
    rarity: 3,
    element: "base",
    activate: {
      healHp: 100,
      healMp: 100,
      healSp: 100,
    }
  },
  {
    id: 1,
    type: "consumables",
    key: "SmallManaPotion",
    name: "Small Mana Potion",
    description: "potion",
    slot: "item",
    rarity: 3,
    element: "base",
    activate: {
      healHp: 500,
    }
  },
  {
    id: 2,
    type: "consumables",
    key: "SmallHealthPotion",
    name: "Small Health Potion",
    description: "potion",
    rarity: 3,
    element: "base",
    activate: {
      healMp: 500,
    }
  },
  {
    id: 3,
    type: "consumables",
    key: "SmallStaminaPotion",
    name: "Small Stamina Potion",
    description: "potion",
    rarity: 3,
    element: "base",
    activate: {
      healSp: 500,
    }
  },
]