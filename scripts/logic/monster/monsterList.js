export const enemyList = {
  goblin: {
    name: "Goblin",
    element: ["dark", "base"],
    type: "Goblin",
    rarity: 3,
    block: 1,

    baseStats: {
      str: 10,
      mgk: 10,
      sta: 10,
      mna: 10,
      def: 10,
      res: 10,
      hlt: 10,
      spd: 10,
      agi: 10,
      dex: 10,
    },

    growthStats: {
      spd: 1.2,
      str: 1.2,
      dex: 1.2
    },
    
    skills: {0: "Slash", 10: "BackStab"},
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href,
    minfloor: 1,
    maxfloor: 10,
    drop: [
      { type: "ingredient", key: "GoblinEar"},
      { type: "ingredient", key: "OldCloth"},
      { type: "ingredient", key: "OldDagger"},
      , 20, 10
    ]
  },

  goblin_shaman: {
    name: "Goblin Shaman",
    element: ["dark", "base"],
    type: "Goblin",
    rarity: 4,
    block: 1,

    baseStats: {
      str: 20,
      mgk: 20,
      sta: 20,
      mna: 20,
      def: 20,
      res: 20,
      hlt: 20,
      spd: 20,
      agi: 20,
      dex: 20,
    },

    growthStats: {
      mgk: 1.2,
      spd: 1.3,
    },

    skills: {0: "BluntForce", 10: "ShadowBall"},
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href,
    minfloor: 1,
    maxfloor: 10,
    drop: [
      { type: "ingredient", key: "GoblinEar"},
      { type: "ingredient", key: "OldCloth"},
      20, 10
    ]
  },

  goblin_hob: {
    name: "Goblin Hob",
    element: ["dark", "base"],
    type: "Goblin",
    rarity: 4,
    block: 2,

    baseStats: {
      str: 25,
      mgk: 25,
      sta: 25,
      mna: 25,
      def: 25,
      res: 25,
      hlt: 25,
      spd: 25,
      agi: 25,
      dex: 25,
    },

    growthStats: {
      str: 1.2,
      hlt: 2,
      def: 2,
    },

    skills: { 0:"BluntForce", 0: "HeavySwing"},
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href,
    minfloor: 5,
    maxfloor: 10,
    drop: [
      {type: "ingredient", key: "WoodenChip" },
      {type: "equipment", key: "OrcWoodenClub" },
      50, 80
    ]
  },
};
