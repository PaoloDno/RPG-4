export const statusList = {

  poison: {
    type: "dot",
    duration: 3,
    power: 0.05,
    description: "Lose 5% max HP every turn."
  },

  burn: {
    type: "dot",
    duration: 3,
    power: 0.04,
    description: "Lose 4% max HP every turn."
  },

  regen: {
    type: "hot",
    duration: 3,
    power: 0.05,
    description: "Recover 5% max HP every turn."
  },

  paralyze: {
    type: "skipTurn",
    chance: 0.25,
    duration: 2,
    description: "25% chance to lose turn."
  },

  shield: {
    type: "damageReduction",
    power: 0.3,
    duration: 2,
    description: "Reduce damage by 30%."
  }

};