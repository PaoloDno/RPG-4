const EquipmentList = [
  // ===== WEAPONS =====
  {
    id: 0,
    key: "IronSword",
    name: "Iron Sword",
    slot: "weapon",
    rarity: 3,
    element: "base",
    skill: "Slash",
    baseStats: { str: 5, dex: 5 },
    growthStats: { str: 1.4 }
  },

  {
    id: 1,
    key: "MageStaff",
    name: "Mage Staff",
    slot: "weapon",
    rarity: 3,
    element: "base",
    skill: "ManaBullet",
    baseStats: { mgk: 5, mna: 5 },
    growthStats: { mgk: 1.4 }
  },

  {
    id: 2,
    key: "MinthrilDagger",
    name: "Minthril Dagger",
    slot: "weapon",
    rarity: 4,
    element: "wind",
    skill: "Slash",
    baseStats: { str: 5, dex: 5, agi: 5 },
    growthStats: { str: 1.2, agi: 1.2, dex: 1.3 }
  },

  {
    id: 3,
    key: "LegendaryLightSword",
    name: "Legendary Light Sword",
    slot: "weapon",
    rarity: 5,
    element: "light",
    skill: "HolySmite",
    baseStats: { str: 6, dex: 4, agi: 4, spd: 5, stm: 4 },
    growthStats: { str: 1.6, dex: 1.2, agi: 1.2, spd: 1.1, stm: 1.1 }
  },

  // ===== CHEST =====
  {
    id: 4,
    key: "LeatherArmor",
    name: "Leather Armor",
    slot: "chest",
    rarity: 3,
    element: "base",
    skill: ["Brace"],
    baseStats: { def: 5, hlt: 5 },
    growthStats: { hlt: 1.2 }
  },

  {
    id: 5,
    key: "AdventurerUniform",
    name: "Adventurer Uniform",
    slot: "chest",
    rarity: 4,
    element: "base",
    skill: ["Brace"],
    baseStats: { def: 5, hlt: 5, res: 5 },
    growthStats: { def: 1.1, hlt: 1.2, res: 1.1 }
  },

  {
    id: 6,
    key: "LichRobe",
    name: "Lich Robe",
    slot: "chest",
    rarity: 5,
    element: "dark",
    skill: "Brace",
    baseStats: { mgk: 5, mna: 5, res: 5 },
    growthStats: { mgk: 1.2, mna: 1.2, res: 1.4 }
  },

  // ===== BOOTS =====
  {
    id: 7,
    key: "MilitaryBoots",
    name: "Military Boots",
    slot: "boots",
    rarity: 3,
    element: "base",
    skill: "Swift",
    baseStats: { spd: 4, hlt: 4 },
    growthStats: { spd: 1.1, hlt: 1.1 }
  },

  {
    id: 8,
    key: "WalkerBoots",
    name: "Walker Boots",
    slot: "boots",
    rarity: 3,
    element: "base",
    skill: {0: "Swift"},
    baseStats: { spd: 4, dex: 4 },
    growthStats: { spd: 1.1, dex: 1.1 }
  },

  {
    id: 9,
    key: "ShadowBoots",
    name: "Shadow Boots",
    slot: "boots",
    rarity: 4,
    element: "dark",
    skill: ["Swift"],
    baseStats: { spd: 4, dex: 4, def: 4 },
    growthStats: { spd: 1.2, dex: 1.1, def: 1.1 }
  },

  // ===== GLOVES =====
  {
    id: 10,
    key: "HandyGloves",
    name: "Handy Gloves",
    slot: "gloves",
    rarity: 3,
    element: "base",
    baseStats: { def: 4, res: 4 },
    growthStats: { def: 1.2, res: 1.1 }
  },

  {
    id: 11,
    key: "FluffyMittens",
    name: "Fluffy Mittens",
    slot: "gloves",
    rarity: 3,
    element: "base",
    baseStats: { hlt: 4, sta: 4 },
    growthStats: { hlt: 1.2, sta: 1.1 }
  },

  // ===== ACCESSORIES =====
  {
    id: 12,
    key: "ManaRing",
    name: "Mana Ring",
    slot: "accessory",
    rarity: 3,
    element: "base",
    baseStats: { mgk: 3, mna: 3 },
    growthStats: { mgk: 1.1, mna: 1.1 }
  },

  // ==== Iron series ==== //

  {
    id: 13,
    key: "IronBoots",
    name: "Iron Boots",
    slot: "boots",
    rarity: 3,
    element: "base",
    skill: "Swift",
    baseStats: { def: 5, spd: 5},
    growthStats: { spd: 1.1, def: 1.5}
  },

  {
    id: 14,
    key: "IronPlate",
    name: "Iron Plate",
    slot: "chest",
    rarity: 4,
    element: "base",
    skill: "",
    baseStats: { def: 5, hlt: 5},
    growthStats: { hlt: 1.1, def: 1.5}
  },
  
  {
    id: 15,
    key: "IronHelm",
    name: "Iron Helm",
    slot: "head",
    rarity: 4,
    element: "base",
    skill: "",
    baseStats: { def: 5, res: 5},
    growthStats: { res: 1.1, def: 1.5}
  },

  {
    id: 16,
    key: "IronGuantlet",
    name: "Iron Guantlet",
    slot: "head",
    rarity: 4,
    element: "base",
    skill: "",
    baseStats: { def: 4, dex: 4, agi: 4},
    growthStats: { res: 1.1, def: 1.1, dex: 1.2}
  },

  {
    id: 17,
    key: "IronPendant",
    name: "Iron Pendant",
    slot: "accessories",
    rarity: 4,
    element: "base",
    skill: "",
    baseStats: { mgk: 4, mna: 4},
    growthStats: { mgk: 1.1, mna: 1.2},
  },

  {
    id: 18,
    key: "IronTrincket",
    name: "Iron Trincket",
    slot: "accessories",
    rarity: 4,
    element: "base",
    skill: "",
    baseStats: { str: 4, sta: 4},
    growthStats: { str: 1.1, sta: 1.2},
  },

  {
    id: 19,
    key: "BeginnersVest",
    name: "Beginners Vest",
    slot: "chest",
    rarity: 3,
    element: "base",
    skill: "heal",
    baseStats: { hlt: 4, mna: 4},
    growthStats: { str: 1.1, sta: 1.1},
  },


];

export default EquipmentList;
