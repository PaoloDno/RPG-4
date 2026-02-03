// chapter1.js


// portrait dialougetoo


// getState party
// even max is 4 it should be 8 array of name that is put in case there a single two or three only but its still ditrbuted fairly
// []
//
//

export const Chapter1 = [

  {
    leftChar: "GirlNpc",
    speakerName: "Inn Woman",
    speakerSide: "left",
    text: "Good morning adventurer. Welcome to the base floor of the Tower Dungeon.",
    background: "Dungeon"
  },

  {
    system: true,
    text: "You and your party feel fully rested."
  },

  {
    system: true,
    text: "HP, Mana, and Stamina fully restored."
  },

  {
    leftChar: "GirlNpc",
    rightChar: "",
    speakerName: "Inn Woman",
    speakerSide: "left",
    text: "Good morning adventurer. Welcome to the base floor of the Tower Dungeon.",
    background: "Dungeon"
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Inn Woman",
    speakerSide: "left",
    text: "You may rest here anytime for 10 gold. It restores everything but consumes one day."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Inn Woman",
    speakerSide: "left",
    text: "Actually... could you run an errand for me?"
  },

  {
    system: true,
    text: "Received Item: Creamy Broth"
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Inn Woman",
    speakerSide: "left",
    text: "Please deliver this to my sister in the market district."
  }

];


export const Chapter1A = [

  {
    system: true,
    background: "TownMarket",
    text: "You arrive at the market district."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Store Girl",
    speakerSide: "left",
    text: "Welcome adventurer! The market sells many useful supplies."
  },

  {
    system: true,
    text: "Received Items: HP Potion x2, Mana Potion x1, Stamina Potion x1"
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Store Girl",
    speakerSide: "left",
    text: "You should visit the armory next. My sister is the finest smith in town."
  }

];

 export const Chapter1B = [

  {
    system: true,
    background: "Armory",
    text: "You enter the armory."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Smith Woman",
    speakerSide: "left",
    text: "I'm busy forging an SSR Level 80 weapon!"
  },

  {
    system: true,
    text: "*CRASH* Armor collapses nearby."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Smith Woman",
    speakerSide: "left",
    text: "...Thanks for helping."
  },

  {
    system: true,
    text: "Received Weapon: Iron Mythril Dagger"
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Smith Woman",
    speakerSide: "left",
    text: "Crafted weapons contain mana and boost your stats."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Smith Woman",
    speakerSide: "left",
    text: "There are level and equipment requirements to unlock their power."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Smith Woman",
    speakerSide: "left",
    text: "Deliver these daggers to the Adventurer Guild for me."
  }

];

 export const Chapter1C = [

  {
    system: true,
    background: "Guild",
    text: "You enter the Adventurer Guild."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Guild Receptionist",
    speakerSide: "left",
    text: "Welcome to the Adventurer Guild."
  },

  {
    system: true,
    text: "Daggers delivered."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Guild Receptionist",
    speakerSide: "left",
    text: "You are now officially registered."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Guild Receptionist",
    speakerSide: "left",
    text: "The guild now automatically records dungeon subjugations."
  },

  {
    leftChar: "GirlNpc",
    speakerName: "Guild Receptionist",
    speakerSide: "left",
    text: "You may now enter the Tower Dungeon."
  }

];