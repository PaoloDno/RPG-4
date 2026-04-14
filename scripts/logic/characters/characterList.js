

export const CharacterList = {

  Arin: {
    name: "Arin",
    element: "aqua",
    type: "Mage",
    rarity: 5,

    baseStats: { mgk: 12, mna: 12, res: 12, hlt: 8, agi: 12, spd: 8 },
    growthStats: { mgk: 1.5, mna: 1.5, spd: 1.2, agi: 1.2 },

    equipment: {
      weapon: "WoodenStaff"
    },

    skills: { 0: "ManaBullet", 5: "IceBlast", 6: "Explosion"},

    chibisprite: new URL ("./../../../assets/sprites/heroes/chibi/Arin.png", import.meta.url).href,
    combatsprite: new URL ("./../../../assets/sprites/heroes/chibi/battle/ArinCombatSprite.png", import.meta.url).href,
    splashsprite: new URL ("./../../../assets/sprites/stories/portrait/heroportrait/ArinSplashArt.png", import.meta.url).href,
  },


  Ares: {
    name: "Ares",
    element: "pyro",
    type: "Warrior",
    rarity: 5,

    baseStats: { str: 12, hlt: 11, def: 15, agi: 8, spd: 11, mna: 6 },
    growthStats: { str: 1.6, hlt: 1.4, def: 1.3, spd: 1.2 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Slash", 5: "FlameSlash", 6:"FinalSlash"},

    chibisprite: new URL ("./../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url).href,
    combatsprite: new URL ("./../../../assets/sprites/heroes/chibi/battle/AresCombatSprite.png", import.meta.url).href,
    splashsprite: new URL ("./../../../assets/sprites/stories/portrait/heroportrait/AresSplashArt.png", import.meta.url).href,
  },


  Asa: {
    name: "Asa",
    element: "dark",
    type: "Ninja",
    rarity: 5,

    baseStats: { str: 12, agi: 13, spd: 12, dex: 12 , def: 8, res: 8, hlt: 9},
    growthStats: { str: 1.4, agi: 1.5, spd: 1.5, dex: 1.5 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Slash", 5: "BackStab"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url).href,
    combatsprite: new URL ("./../../../assets/sprites/heroes/chibi/battle/AsaCombatSprite.png", import.meta.url).href,
    splashsprite: new URL ("./../../../assets/sprites/stories/portrait/heroportrait/AsaSplashArt.png", import.meta.url).href,
  },


  Arceus: {
    name: "Arceus",
    element: "base",
    type: "Pope",
    rarity: 5,

    baseStats: { mgk: 12, mna: 12, res: 12, hlt: 12, dex: 8, agi: 8 },
    growthStats: { mgk: 1.4, mna: 1.4, res: 1.4, hlt: 1.5 },

    equipment: {
      weapon: "WoodenStaff"
    },

    skills: { 0: "Heal", 5: "HolySmite"},

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Arceus.png", import.meta.url).href,
    combatsprite: new URL ("./../../../assets/sprites/heroes/chibi/battle/ArceeeusCombatSprite.png", import.meta.url).href,
    splashsprite: new URL ("./../../../assets/sprites/stories/portrait/heroportrait/ArceeeusSplashArt.png", import.meta.url).href,
  },

  Aria: {
    name: "Aria",
    element: "wind",
    type: "Archer",
    rarity: 5,

    baseStats: { str: 12, dex: 11, agi: 13, spd: 13, hlt: 8, mna: 7 },
    growthStats: { str: 1.4, dex: 1.5, agi: 1.5, spd: 1.4 },

    equipment: {
      weapon: "WoodenSword"
    },

    skills: { 0: "Strike", 5: "BackStab" },

    chibisprite: new URL("./../../../assets/sprites/heroes/chibi/Aria.png", import.meta.url).href,
    combatsprite: new URL ("./../../../assets/sprites/heroes/chibi/battle/AriaCombatSprite.png", import.meta.url).href,
    splashsprite: new URL ("./../../../assets/sprites/stories/portrait/heroportrait/AriaSplashArt.png", import.meta.url).href,
  },

};