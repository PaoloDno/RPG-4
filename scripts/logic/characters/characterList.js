export const CharacterList = {

  Arin: {
    name: "Arin",
    element: "aqua",
    type: "Mage",
    rarity: 5,

    baseStats: { mgk: 10, mna: 10, res: 10, hlt: 8, agi: 12, spd: 10 },
    growthStats: { mgk: 1.5, mna: 1.5, spd: 1.2, agi: 1.2 },

    equipment: {
      weapon: "WoodenStaff"
    },

    skills: { 0: "ManaBullet", 5: "IceBlast", 6: "Explosion"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Arin.png", import.meta.url).href
  },


  Ares: {
    name: "Ares",
    element: "pyro",
    type: "Warrior",
    rarity: 5,

    baseStats: { str: 12, hlt: 10, def: 9, agi: 8, spd: 8, mna: 5 },
    growthStats: { str: 1.6, hlt: 1.4, def: 1.3, spd: 1.2 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Slash", 5: "FlameSlash", 6:"FinalSlash"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href
  },


  Asa: {
    name: "Asa",
    element: "dark",
    type: "Ninja",
    rarity: 5,

    baseStats: { str: 9, agi: 12, spd: 11, dex: 10, hlt: 8, mna: 6 },
    growthStats: { str: 1.4, agi: 1.5, spd: 1.5, dex: 1.5 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Slash", 5: "BackStab"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },


  Arceus: {
    name: "Arceus",
    element: "base",
    type: "Pope",
    rarity: 5,

    baseStats: { mgk: 9, mna: 10, res: 11, hlt: 10, agi: 7, spd: 8 },
    growthStats: { mgk: 1.4, mna: 1.4, res: 1.4, hlt: 1.5 },

    equipment: {
      weapon: "WoodenStaff"
    },

    skills: { 0: "Heal", 5: "HolySmite"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Arceus.png", import.meta.url).href
  },


  Ark: {
    name: "Ark",
    element: "light",
    type: "HolyPaladin",
    rarity: 5,

    baseStats: { str: 10, def: 10, hlt: 10, res: 9, agi: 8, spd: 8 },
    growthStats: { str: 1.5, def: 1.4, hlt: 1.3, res: 1.3 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Heal", 5: "HolySmite"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Ark.png", import.meta.url).href
  },


  Aria: {
    name: "Aria",
    element: "wind",
    type: "Archer",
    rarity: 5,

    baseStats: { str: 11, dex: 11, agi: 10, spd: 10, hlt: 8, mna: 5 },
    growthStats: { str: 1.4, dex: 1.5, agi: 1.5, spd: 1.4 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Strike", 5: "BackStab" },

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Aria.png", import.meta.url).href
  }

};