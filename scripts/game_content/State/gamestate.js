export const defaultPlayerGameState = {
  meta: {
    version: 1,
    playTime: 0,
    lastSavedAt: null,
  },

  bag: [
    // items
  ],

  keyItems: [
    // lore items,
  ],

  gold: 100,
  party: [
    // Example structure for a character
    // You can have multiple members here
    /*
    {
      name: "Arin",
      class: "Mage",
      level: 1,
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
      stats: { }
      skills: [],
      equipment: {},
      exp: 0,
    },
    */
  ],

  world: {
    max_floor: 1,
    day: 1,
    time: 7, // every tile move add 1
    phase: "morning",
    progress: 0,
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
