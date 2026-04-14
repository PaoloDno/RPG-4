const EquipmentList = {

  // ===== WEAPONS =====
  IronSword: {
    id: 0,
    name: "Iron Sword",
    slot: "weapon",
    price: 500,
    rarity: 4,
    element: "base",
    skill: "Slash",
    baseStats: { str: 5, dex: 5, def: 5 },
    growthStats: { str: 1.3, dex: 1.1, def: 1.2 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/IronSword.png", import.meta.url).href,
  },

  MageStaff: {
    id: 1,
    name: "Mage Staff",
    slot: "weapon",
    price: 500,
    rarity: 4,
    element: "base",
    skill: "ManaBullet",
    baseStats: { mgk: 5, mna: 5, res: 5 },
    growthStats: { mgk: 1.3, mna: 1.1, res: 1.5 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/MageStaff.png", import.meta.url).href,
  },

  MinthrilDagger: {
    id: 2,
    name: "Minthril Dagger",
    slot: "weapon",
    rarity: 4,
    price: 300,
    element: "wind",
    skill: "Slash",
    baseStats: { str: 5, dex: 5, agi: 5 },
    growthStats: { str: 1.2, agi: 1.2, dex: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/MinthrillDagger.png", import.meta.url).href,
  },

  LegendaryLightSword: {
    id: 3,
    name: "Legendary Light Sword",
    slot: "weapon",
    price: 1200,
    rarity: 5,
    element: "light",
    skill: "HolySmite",
    baseStats: { str: 5, dex: 5, agi: 5, spd: 5 },
    growthStats: { str: 1.2, dex: 1.2, agi: 1.2 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/LegendarySword.png", import.meta.url).href,
  },

  // ===== CHEST =====
  LeatherArmor: {
    id: 4,
    name: "Leather Armor",
    slot: "chest",
    rarity: 3,
    price: 200,
    element: "base",
    skill: ["Brace"],
    baseStats: { def: 5, hlt: 5 },
    growthStats: { hlt: 1.2 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/LeatherArmor.png", import.meta.url).href,
  },

  AdventurerUniform: {
    id: 5,
    name: "Adventurer Uniform",
    slot: "chest",
    rarity: 4,
    price: 400,
    element: "base",
    skill: ["Brace"],
    baseStats: { def: 5, hlt: 5, res: 5 },
    growthStats: { def: 1.1, hlt: 1.2, res: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/AdventurerUniform.png", import.meta.url).href,
  },

  LichRobe: {
    id: 6,
    name: "Lich Robe",
    slot: "chest",
    rarity: 4,
    price: 500,
    element: "dark",
    skill: "Brace",
    baseStats: { mgk: 5, mna: 5, res: 5 },
    growthStats: { mgk: 1.1, mna: 1.2, res: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/LichRobe.png", import.meta.url).href,
  },

  // ===== BOOTS =====
  MilitaryBoots: {
    id: 7,
    name: "Military Boots",
    slot: "boots",
    rarity: 3,
    price: 200,
    element: "base",
    skill: "Swift",
    baseStats: { spd: 4, hlt: 4 },
    growthStats: { spd: 1.1, hlt: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/MilitaryBoots.png", import.meta.url).href,
  },

  WalkerBoots: {
    id: 8,
    name: "Walker Boots",
    slot: "boots",
    rarity: 3,
    price: 200,
    element: "base",
    skill: ["Swift"],
    baseStats: { spd: 4, dex: 4 },
    growthStats: { spd: 1.1, dex: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/WalkerBoots.png", import.meta.url).href,
  },

  ShadowBoots: {
    id: 9,
    name: "Shadow Boots",
    slot: "boots",
    rarity: 4,
    price: 600,
    element: "dark",
    skill: ["Swift"],
    baseStats: { spd: 4, dex: 4, def: 4 },
    growthStats: { spd: 1.2, dex: 1.1, def: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/ShadowBoots.png", import.meta.url).href,
  },

  AdventurerVest: {
    id: 19,
    name: "Adventurer Vest",
    slot: "chest",
    rarity: 3,
    price: 200,
    element: "base",
    skill: "Heal",
    baseStats: { hlt: 4, mna: 4 },
    growthStats: { str: 1.1, sta: 1.1 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/AdventurerVest.png", import.meta.url).href,
  },

  WoodenSword: {
    id: 20,
    name: "Wooden Sword",
    slot: "weapon",
    rarity: 3,
    price: 100,
    element: "base",
    skill: "Slash",
    baseStats: { str: 5, agi: 4 },
    growthStats: { str: 1.1, agi: 1.2 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/WoodenSword.png", import.meta.url).href,
  },

  WoodenStaff: {
    id: 21,
    name: "Wooden Staff",
    slot: "weapon",
    rarity: 3,
    price: 100,
    element: "base",
    skill: "ManaBullet",
    baseStats: { mgk: 5, mna: 4 },
    growthStats: { mgk: 1.1, mna: 1.2 },
    sprite: new URL ("./../../../assets/sprites/items/equipment/WoodenStaff.png", import.meta.url).href,
  }

};

export default EquipmentList;