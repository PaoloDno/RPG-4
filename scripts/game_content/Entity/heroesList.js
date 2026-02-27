// HeroList.js
export const HeroList = {
  Arin: {
    name: "Arin",
    element: "aqua",
    type: "Mage",
    rarity: 5,
    baseStats: { str: 15, mgk: 40, hlt: 15, res: 30, mna: 30, spd: 40 },
    growthStats: { str: 1, mgk: 1.6, sta: 1, mna: 2, def: 1, res: 1.4, hlt: 1, spd: 1.2, agi: 1, dex: 1 },
    skills: { 0: "WaterPulse", 5: "IceBlast", 10: "Tsunami" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Arin.png", import.meta.url).href
  },

  Ares: {
    name: "Ares",
    element: "pyro",
    type: "Warrior",
    rarity: 5,
    baseStats: { str: 55, mgk: 25, hlt: 30, res: 25, def: 25, agi: 30 },
    growthStats: { str: 1.5, mgk: 1, sta: 1.2, mna: 2, def: 1.5, res: 1, hlt: 1.4, spd: 1.2, agi: 1.2, dex: 1.2 },
    skills: { 0: "Slash", 5: "FlamePillarSlash", 10: "InfernoBreaker" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href
  },

  Asa: {
    name: "Asa",
    element: "dark",
    type: "Ninja",
    rarity: 5,
    baseStats: { str: 30, mgk: 20, sta: 30, mna: 20, def: 20, res: 20, hlt: 30, spd: 40, agi: 30, dex: 30 },
    growthStats: { str: 1.4, mgk: 1, sta: 1.1, mna: 1, def: 1.1, res: 1, hlt: 1.1, spd: 1.5, agi: 1.5, dex: 1.5 },
    skills: { 0: "Slash", 5: "ShadowCut", 10: "Assassinate" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Arceus: {
    name: "Arceus",
    element: "base",
    type: "Pope",
    rarity: 5,
    baseStats: { str: 20, mgk: 30, sta: 30, mna: 30, def: 30, res: 30, hlt: 30, spd: 20, agi: 30, dex: 20 },
    growthStats: { str: 1, mgk: 1.3, sta: 1, mna: 1.3, def: 1.1, res: 1.3, hlt: 1.5, spd: 1.2, agi: 1.3, dex: 1.2 },
    skills: { 0: "HolyHeal", 5: "SanctuaryHeal", 10: "DivineJudgement" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Arceus.png", import.meta.url).href
  },

  Ark: {
    name: "Ark",
    element: "light",
    type: "HolyPaladin",
    rarity: 5,
    baseStats: { str: 40, mgk: 20, sta: 30, mna: 15, def: 25, res: 20, hlt: 30, spd: 30, agi: 40, dex: 20 },
    growthStats: { str: 1.5, mgk: 1, sta: 1.3, mna: 1, def: 1.3, res: 1.3, hlt: 1.2, spd: 1.2, agi: 1.2, dex: 1.2 },
    skills: { 0: "HolyHeal", 5: "HolySmite", 10: "DivineJudgement" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Ark.png", import.meta.url).href
  },

  Aria: {
    name: "Aria",
    element: "wind",
    type: "Archer",
    rarity: 5,
    baseStats: { str: 45, mgk: 25, hlt: 30, def: 25, spd: 35, agi: 30, dex: 30 },
    growthStats: { str: 1.4, mgk: 1, sta: 1.3, mna: 1, def: 1, res: 1, hlt: 1, spd: 1.5, agi: 1.5, dex: 1.5 },
    skills: { 0: "Strike", 5: "WindSnipe", 10: "Assassinate" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Aria.png", import.meta.url).href
  },

  Bach: {
    name: "Bach",
    element: "wind",
    type: "Swordsman",
    rarity: 4,
    baseStats: { str: 30, spd: 30, dex: 30, agi: 30, hlt: 30 },
    growthStats: { str: 1.2, mgk: 1, sta: 1, mna: 1, def: 1.2, res: 1, hlt: 1.2, spd: 1.2, agi: 1.2, dex: 1.2 },
    skills: { 0: "QuickSlash", 5: "CrossEdge", 10: "BladeStorm" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Billy: {
    name: "Billy",
    element: "wind",
    type: "Archer",
    rarity: 4,
    baseStats: { str: 45, spd: 30, dex: 35 },
    growthStats: { str: 1.1, mgk: 1, sta: 1, mna: 1, def: 1, res: 1, hlt: 1, spd: 1.5, agi: 1.5, dex: 1.5 },
    skills: { 0: "ArrowShot", 5: "WindSnipe", 10: "PiercingArrow" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Bea: {
    name: "Bea",
    element: "light",
    type: "Priest",
    rarity: 4,
    baseStats: { mgk: 35, res: 25, def: 25, spd: 30, hlt: 35 },
    growthStats: { str: 1, mgk: 1.3, sta: 1, mna: 1.3, def: 1, res: 1.2, hlt: 1.2, spd: 1.5, agi: 1.1, dex: 1 },
    skills: { 0: "HolyHeal", 5: "GreatHolyHeal", 10: "DivineGrace" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Boris: {
    name: "Boris",
    element: "light",
    type: "Priest",
    rarity: 4,
    baseStats: { str: 20, mgk: 20, sta: 30, mna: 20, def: 30, res: 30, hlt: 30, spd: 20, agi: 30, dex: 20 },
    growthStats: { str: 1, mgk: 1.3, sta: 1, mna: 1.3, def: 1, res: 1.2, hlt: 1.2, spd: 1.5, agi: 1.1, dex: 1 },
    skills: { 0: "Smash", 5: "HolySmite", 10: "DivineBarrier" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Cain: {
    name: "Cain",
    element: "base",
    type: "Adventurer",
    rarity: 3,
    baseStats: { str: 25, mgk: 20, sta: 25, mna: 20, def: 20, res: 20, hlt: 30, spd: 20, agi: 35, dex: 20 },
    growthStats: { str: 1.2, mgk: 1, sta: 1.2, mna: 1, def: 1, res: 1, hlt: 1.2, spd: 1.2, agi: 1.2, dex: 1.2 },
    skills: { 0: "Slash", 5: "Smash", 10: "LimitBreak" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  },

  Cheerios: {
    name: "Cheerios",
    element: "base",
    type: "MagicWolf",
    rarity: 3,
    baseStats: { str: 20, mgk: 35, sta: 20, mna: 25, def: 20, res: 20, hlt: 25, spd: 25, agi: 20, dex: 25 },
    growthStats: { str: 1, mgk: 1.2, sta: 1, mna: 1.2, def: 1, res: 1, hlt: 1.2, spd: 1.4, agi: 1, dex: 1.2 },
    skills: { 0: "Bite", 5: "Tackle", 10: "PrimalBurst" },
    chibisprite: new URL("../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href
  }
};
