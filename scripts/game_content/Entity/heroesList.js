

// HeroList.js
export const HeroList = {
  Arin: {
    name: "Arin",
    element: "aqua",      
    level: 1,             
    type: "Mage",
    rarity: 5,

    baseStats: {
      str: 15,
      mgk: 40,
      hlt: 15,
      res: 30,
      mna: 30,
      spd: 40,
    },

    growthStats: {
      str: 1,
      mgk: 1.6,
      sta: 1,
      mna: 2,
      def: 1,
      res: 1.4,
      hlt: 1,
      spd: 1.2,
      agi: 1,
      dex: 1
    },

    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Arin.png", import.meta.url
    ).href
  },

  Ares: {
    name: "Ares",
    element: "pyro",      
    level: 1,             
    type: "Warrior",
    rarity: 5,

    baseStats: {
      str: 55,
      mgk: 25,
      hlt: 30,
      res: 25,
      def: 25,
      agi: 30,
    },

    growthStats: {
      str: 1.5,
      mgk: 1,
      sta: 1.2,
      mna: 2,
      def: 1.5,
      res: 1,
      hlt: 1.4,
      spd: 1.2,
      agi: 1.2,
      dex: 1.2
    },

    
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Ares.png", import.meta.url
    ).href
  },

  
   Asa: {
    name: "Asa",
    element: "dark",      
    level: 1,             
    type: "Ninja",
    rarity: 5,

    
    baseStats: {
      str: 20 + 10,
      mgk: 20,
      sta: 20 + 10,
      mna: 20,
      def: 20,
      res: 20,
      hlt: 20 + 10,
      spd: 20 + 20,
      agi: 20 + 10,
      dex: 20 + 10,
    },

    growthStats: {
      str: 1.4,
      mgk: 1,
      sta: 1.1,
      mna: 1,
      def: 1.1,
      res: 1,
      hlt: 1.1,
      spd: 1.5,
      agi: 1.5,
      dex: 1.5
    },
    
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

   Arceus: {
    name: "Arceus",
    element: "base",      
    level: 1,             
    type: "Pope",
    rarity: 5,

    
    baseStats: {
      str: 20,
      mgk: 20 + 10,
      sta: 20 + 10,
      mna: 20 + 10,
      def: 20 + 10,
      res: 20 + 10,
      hlt: 20 + 10,
      spd: 20,
      agi: 20 + 10,
      dex: 20,
    },

    growthStats: {
      str: 1,
      mgk: 1.3,
      sta: 1,
      mna: 1.3,
      def: 1.1,
      res: 1.3,
      hlt: 1.5,
      spd: 1.2,
      agi: 1.3,
      dex: 1.2
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

   Ark: {
    name: "Arceus",
    element: "light",      
    level: 1,             
    type: "HolyPaladin",
    rarity: 5,

    
    baseStats: {
      str: 20 + 20,
      mgk: 20,
      sta: 20 + 10,
      mna: 15,
      def: 20 + 5,
      res: 20,
      hlt: 20 + 10,
      spd: 20 + 10,
      agi: 20 + 20,
      dex: 20,
    },

    growthStats: {
      str: 1.5,
      mgk: 1,
      sta: 1.3,
      mna: 1,
      def: 1.3,
      res: 1.3,
      hlt: 1.2,
      spd: 1.2,
      agi: 1.2,
      dex: 1.2
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  Aria: {
    name: "Aria",
    element: "wind",      
    level: 1,             
    type: "Archer",
    rarity: 5,

    baseStats: {
      str: 45,
      mgk: 25,
      hlt: 30,
      def: 25,
      spd: 35,
      agi: 30,
      dex: 30,
    },

    growthStats: {
      str: 1.4,
      mgk: 1,
      sta: 1.3,
      mna: 1,
      def: 1,
      res: 1,
      hlt: 1,
      spd: 1.5,
      agi: 1.5,
      dex: 1.5
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  Bach: {
    name: "Bach",
    element: "wind",      
    level: 1,             
    type: "Swordsman",
    rarity: 4,

    baseStats: {
      str: 30,
      spd: 30,
      dex: 30,
      agi: 30,
      htl: 30
    },

    growthStats: {
      str: 1.2,
      mgk: 1,
      sta: 1,
      mna: 1,
      def: 1.2,
      res: 1,
      hlt: 1.2,
      spd: 1.2,
      agi: 1.2,
      dex: 1.2
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  Billy: {
    name: "Billy",
    element: "wind",      
    level: 1,             
    type: "Archer",
    rarity: 4,

    baseStats: {
      str: 20 + 25,
      spd: 30,
      dex: 35,
    },

    growthStats: {
      str: 1.1,
      mgk: 1,
      sta: 1,
      mna: 1,
      def: 1,
      res: 1,
      hlt: 1,
      spd: 1.5,
      agi: 1.5,
      dex: 1.5
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  
  Bea: {
    name: "Bea",
    element: "light",      
    level: 1,             
    type: "Priest",
    rarity: 4,

    baseStats: {
      mgk: 20 + 15,
      res: 20 + 5,
      def: 20 + 5,
      spd: 30,
      hlt: 20 + 15,
    },

    growthStats: {
      str: 1,
      mgk: 1.3,
      sta: 1,
      mna: 1.3,
      def: 1,
      res: 1.2,
      hlt: 1.2,
      spd: 1.5,
      agi: 1.1,
      dex: 1
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  Boris: {
    name: "Boris",
    element: "light",      
    level: 1,             
    type: "Priest",
    rarity: 4,

    baseStats: {
      str: 20,
      mgk: 20,
      sta: 20 + 10,
      mna: 20,
      def: 20 + 10,
      res: 20 + 10,
      hlt: 20 + 10,
      spd: 20,
      agi: 20 + 10,
      dex: 20,
      },

    growthStats: {
      str: 1,
      mgk: 1.3,
      sta: 1,
      mna: 1.3,
      def: 1,
      res: 1.2,
      hlt: 1.2,
      spd: 1.5,
      agi: 1.1,
      dex: 1
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  
  Cain: {
    name: "Cain",
    element: "base",      
    level: 1,             
    type: "Adventurer",
    rarity: 3,

    baseStats: {
      str: 20 + 5,
      mgk: 20,
      sta: 20 + 5,
      mna: 20,
      def: 20,
      res: 20,
      hlt: 20 + 10,
      spd: 20,
      agi: 20 + 15,
      dex: 20,
      },

    growthStats: {
      str: 1.2,
      mgk: 1,
      sta: 1.2,
      mna: 1,
      def: 1,
      res: 1,
      hlt: 1.2,
      spd: 1.2,
      agi: 1.2,
      dex: 1.2
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },

  Cheerios: {
    name: "Cheerios",
    element: "base",      
    level: 1,             
    type: "MagicWolf",
    rarity: 3,

    baseStats: {
      str: 20,
      mgk: 20 + 15,
      sta: 20,
      mna: 20 + 5,
      def: 20,
      res: 20,
      hlt: 20 + 5,
      spd: 20 + 5,
      agi: 20,
      dex: 20 + 5,
      },

    growthStats: {
      str: 1,
      mgk: 1.2,
      sta: 1,
      mna: 1.2,
      def: 1,
      res: 1,
      hlt: 1.2,
      spd: 1.4,
      agi: 1,
      dex: 1.2
    },
    chibisprite: new URL(
      "../../../assets/sprites/heroes/chibi/Asa.png", import.meta.url
    ).href
  },
};
