// how should i make multiple dmg hit

// 

export const skillList = {

  Slash: {
    type: "physical",
    elem: "base",
    spCost: () => 0,
    mpCost: () => 0,
    power: (user) => 10 + user.physAtk,
    effect: () =>
      console.log("A"),
  },

  BluntForce: {
    type: "physical",
    elem: "base",
    spCost: () => 0,
    mpCost: () => 0,
    power: (user) => 10 + user.mgkAtk,
  },

  ManaPellet: {
    type: "magical",
    elem: "base",
    spCost: () => 0,
    mpCost: (user, dmg) => Math.floor(dmg / 2),
    power: (user) =>
      10 + user.stats.mgk * 2 + user.stats.mna + user.stats.dex
  },

  KiStrike: {
    type: "physical",
    elem: "base",
    spCost: (user, dmg) => Math.floor(dmg / 2),
    mpCost: () => 0,
    power: (user) =>
      10 + user.stats.str * 2 + user.stats.agi + user.stats.dex
  },

  ManaBlast: {
    type: "magical",
    elem: "base",
    spCost: () => 0,
    mpCost: (user, dmg) =>
      Math.floor(dmg / 2 + user.stats.mgk),
    power: (user) =>
      10 + user.stats.mgk * 3 + user.stats.mna + user.stats.dex
  },

  FlameSlash: {
    type: "physical",
    elem: "pyro",
    spCost: (user, dmg) => Math.floor(dmg / 2),
    mpCost: (user) => user.stats.str,
    power: (user) =>
      10 + user.stats.str * 3 + user.stats.agi + user.stats.dex
  }
};
