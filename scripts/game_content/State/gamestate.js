export const defaultPlayerGameState = {
  meta: {
    version: 1,
    playTime: 0,
    lastSavedAt: null
  },

  bag: [
    // items
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
    }
    */
  ],

  world: {
    floor: 1,
    time: 7, // every tile move add 1
    floormatrix: [
      [],
      [],
      []
    ],
  },


  monsterKills: [], //quest are by monster killed

  stats: {
    kills: {},
    deaths: 0
  },
};
