export const defaultPlayerGameState = {
  meta: {
    version: 1,
    lastSavedAt: null,
  },

  bag: [
    // items
  ],

  ingredients: [
    // ingredients
  ],

  inventory: [
    // equipment
  ],

  keyItems: [
    // lore items,
  ],

  gold: 100,
  partyInitialize: [
    // Example structure for a character
    // You can have multiple members here
    /*
    {
      name: "Arin",
      class: "Mage",
      level: 1,
      exp: 0,
      attributes: {
      hp,
      maxhp: hp,
      mp,
      maxMp: mp,
      sp,
      maxSp: sp,
      actionSpeed,
      critR, critD,
      armor, mgkRes
      },
      stats: {
        str,
        mgk,
        ...
      }
      skills: [],
      equipment: {},
    },
    */
  ],
  party: [
    /*
    {
      name: "",
      exp: "",
      level: 1,
      equipmnets: {
        warrior: "",
        head: "",
        chest: "AdventurerVest",  
        arms: "",
        boots: "",
        accessories: "",    
      },
    }
    */
  ],

  world: {
    max_floor: 1,
    day: 1,
    week: 1,
    time: 7, 
    dayPhase: "Morning",
    progress: 0,
    volume: 0.5,
    sceneState: {},
    volumeModal: false,
    bagModal: false,
    timeModal: false,
    partyModal: false,
    titleModal: false,
    dynamicHeaderState: {

    },
  },

  position: {
    floor: 1, // Current floor the party is on
    x: 1, // X-coordinate on this floor
    y: 1, // Y-coordinate on this floor
    facing: "up", // Direction party is facing (used for UI animations or movement)
  },

  memoryMap: {},
  
  floorMemoryKey: {},
  
  combat:{
    party: [],
    opponent: [],
    turnArray : [],
    turn: 0,
    monsterposition:{
      floor: null,
      x: null,
      y: null,
    },
  },

  monsterKills: [], //quest are by monster killed

  stats: {
    kills: {},
    deaths: 0,
  },
};

